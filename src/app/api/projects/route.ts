import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

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

  console.log(body);

  try {
    const userDraft = await prisma.draft.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    const { id, ...restWithNoId } = body;

    const { technologies, ...restBody } = restWithNoId;

    const project = await prisma.project.upsert({
      where: {
        id: body.id,
      },
      create: {
        ...restWithNoId,
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
      update: {
        ...restBody,
        technologies: {
          deleteMany: {},
          create: technologies.map((technologyId: number) => {
            return {
              technologyId,
            };
          }),
        },
      },
    });
    revalidateTag("project");
    revalidatePath(`/create`);
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
