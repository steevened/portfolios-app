import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerAuthSession();

  if (!session || !session.user)
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  const { id } = params;

  try {
    const res = await prisma.project.update({
      where: {
        id,
      },
      data: {
        isOnDraft: true,
      },
    });
    return NextResponse.json(
      {
        message: 'The project has been moved to draft',
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Operation failed', error },
      { status: 500 }
    );
  }
};
