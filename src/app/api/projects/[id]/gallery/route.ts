import { getServerAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerAuthSession();

  if (!session || !session.user)
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  const { id } = params;

  const formData = await request.formData();

  const { searchParams } = new URL(request.url);
  const skipString = searchParams.get("skip") as "true" | "false";
  const skip = skipString === "true";

  if (!formData || skip) {
    try {
      const projectPublished = await prisma.project.update({
        where: {
          id,
        },
        data: {
          published: true,
          draftId: null,
          isOnDraft: false,
        },
      });
      return NextResponse.json(
        {
          message: "Operation successful",
          data: projectPublished,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Operation failed", error },
        { status: 500 }
      );
    }
  }

  try {
    const files = formData.getAll("files") as File[];

    const fileLinks = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = path.join(process.cwd(), "public/img", file.name);

      const normalizedPath = path.normalize(filePath);

      const fileLink = `${
        process.env.NODE_ENV === "production"
          ? "https://porfolios-app.netlify.app/"
          : "http://localhost:3000"
      }/img/${path.basename(normalizedPath)}`;

      writeFile(filePath, buffer);

      return fileLink;
    });

    const projectPublished = await prisma.project.update({
      where: {
        id,
      },
      data: {
        published: true,
        draftId: null,
        isOnDraft: false,
        gallery: {
          createMany: {
            data: await Promise.all(
              fileLinks.map(async (filelink) => ({ url: await filelink }))
            ),
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Operation successful",
        data: { projectPublished },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Operation failed", error },
      { status: 500 }
    );
  }
}
