// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

// Types.
type ParamsT = {
  projectId?: string;
};

// Post Route Handler.
export async function POST(_: Request, { params }: { params: ParamsT }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { projectId } = params;

  if (!projectId || typeof projectId !== 'string') throw new Error('Invalid ID');

  let bookmarkIds = [...(currentUser.bookmarkIds || [])];

  bookmarkIds.push(projectId);

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { bookmarkIds },
  });

  return NextResponse.json({ isBookmarked: true });
}

// Delete Route Handler.
export async function DELETE(_: Request, { params }: { params: ParamsT }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { projectId } = params;

  if (!projectId || typeof projectId !== 'string') throw new Error('Invalid ID');

  let bookmarkIds = [...(currentUser.bookmarkIds || [])];

  bookmarkIds = bookmarkIds.filter((id) => id !== projectId);

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { bookmarkIds },
  });

  return NextResponse.json({ isBookmarked: false });
}
