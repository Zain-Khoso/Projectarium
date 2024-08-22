// Lib Imports.
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
  try {
    const { username, currentUserId } = await request.json();

    const userExists = await prisma.user.findUnique({ where: { username } });

    if (userExists && userExists.id !== currentUserId) return NextResponse.json({ isClear: false });

    return NextResponse.json({ isClear: true });
  } catch {
    return NextResponse.error();
  }
}
