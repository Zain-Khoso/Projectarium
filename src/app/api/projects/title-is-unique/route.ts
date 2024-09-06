// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';

// Post Route.
export async function POST(request: Request) {
  const reservedRoutes = ['new'];

  try {
    const { title, ownerId } = await request.json();

    if (reservedRoutes.includes(title)) return NextResponse.json({ isClear: false });

    if (!title || !ownerId) throw new Error('Invalid credentials');

    const titleExists = await prisma.project.findFirst({
      where: { ownerId, AND: { title } },
    });

    if (titleExists) return NextResponse.json({ isClear: false });

    return NextResponse.json({ isClear: true });
  } catch {
    return NextResponse.error();
  }
}
