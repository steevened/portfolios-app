import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();

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

  try {
    const userDraft = await prisma.draft.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    const project = await prisma.project.create({
      data: {
        ...body,
        slug:
          body.name.toLowerCase().trim().replace(" ", "-") + "-" + Date.now(),
        isOnDraft: true,
        draftId: userDraft?.id || undefined,
        authorId: session.user.id,
        technologies: {
          create: body.technologies.map((technologyId: number) => {
            return {
              technologyId,
            };
          }),
        },
      },
    });
    revalidateTag("projects");
    return NextResponse.json(
      { message: "Operation successful", data: project },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Operation failed", error },
      { status: 500 }
    );
  }
}
