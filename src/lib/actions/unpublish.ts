'use server';

import { NextResponse } from 'next/server';
import { getServerAuthSession } from '../auth';
import { prisma } from '../db/prisma';

export async function unpublishProject(projectId: string) {
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

  const res = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      published: false,
    },
  });
  return NextResponse.json(
    {
      message: 'Operation successful',
      data: res,
    },
    {
      status: 200,
    }
  );
}
