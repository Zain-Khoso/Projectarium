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

  await prisma.like.create({ data: { projectId, userId: currentUser.id } });

  return NextResponse.json({ isLiked: true });
}

// Delete Route Handler.
export async function DELETE(_: Request, { params }: { params: ParamsT }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { projectId } = params;

  if (!projectId || typeof projectId !== 'string') throw new Error('Invalid ID');

  await prisma.like.deleteMany({ where: { projectId, AND: { userId: currentUser.id } } });

  return NextResponse.json({ isLiked: false });
}
