// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

// Types.
type ParamsT = {
  commentId?: string;
};

// Post Route Handler.
export async function POST(request: Request, { params }: { params: ParamsT }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { commentId } = params;
  if (!commentId || typeof commentId !== 'string') return NextResponse.error();

  const { text } = await request.json();

  const comment = await prisma.comment.update({
    where: { id: commentId, AND: { userId: currentUser.id } },
    data: { text },
  });

  return NextResponse.json(comment);
}

// Delete Route Handler.
export async function DELETE(_: Request, { params }: { params: ParamsT }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { commentId } = params;
  if (!commentId || typeof commentId !== 'string') return NextResponse.error();

  await prisma.comment.delete({
    where: { id: commentId, AND: { userId: currentUser.id } },
  });

  return NextResponse.json({ deleted: true });
}
