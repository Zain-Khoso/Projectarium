// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

// Post Route.
export async function POST(request: Request) {
  try {
    const { projectId, text } = await request.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const comment = await prisma.comment.create({
      data: { text, projectId, userId: currentUser.id },
    });

    return NextResponse.json(comment);
  } catch {
    return NextResponse.error();
  }
}
