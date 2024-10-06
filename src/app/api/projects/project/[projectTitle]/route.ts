// Lib Imports.
import { NextRequest, NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

// Types.
type ParamsT = {
  projectTitle?: string;
};

// Delete Route Handler.
export async function DELETE(_: NextRequest, { params }: { params: ParamsT }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { projectTitle } = params;

  if (!projectTitle || typeof projectTitle !== 'string') throw new Error('Invalid ID');

  await prisma.project.deleteMany({
    where: { title: projectTitle, AND: { ownerId: currentUser.id } },
  });

  return NextResponse.json({ redirectUrl: `/${currentUser.username}` });
}
