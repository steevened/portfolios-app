import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { WriteFile } from "@/lib/helpers/write-file";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
    const formData = await request.formData();

    const file = formData.get("avatar") as File;

    const fileLink = await WriteFile(file);

    const res = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: fileLink,
      },
    });

    revalidatePath(`/api/user/${session.user.id}`);

    return NextResponse.json(
      {
        message: "Operation successful",
        data: res,
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
