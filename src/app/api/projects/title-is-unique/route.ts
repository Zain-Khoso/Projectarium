// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';

// Post Route.
export async function POST(request: Request) {
  try {
    const { title, currentUserId } = await request.json();

    if (!title || !currentUserId) throw new Error('Invalid credentials');

    const userExists = await prisma.project.findFirst({
      where: { ownerId: currentUserId, AND: { title } },
    });

    if (userExists) return NextResponse.json({ isClear: false });

    return NextResponse.json({ isClear: true });
  } catch {
    return NextResponse.error();
  }
}
