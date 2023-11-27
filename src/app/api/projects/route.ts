import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
    const project = await prisma.project.create({
      data: {
        ...body,
        technologies: {
          create: body.technologies.map((technologyId: number) => {
            return {
              technologyId,
            };
          }),
        },
        slug: body.name.toLowerCase().replace(" ", "-"),
        authorId: session.user.id,
      },
    });
    return NextResponse.json(
      { message: "Operation successful", data: project },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Operation failed", error },
      { status: 500 }
    );
  }
}
