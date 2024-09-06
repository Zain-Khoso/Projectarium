// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

// Post Route.
export async function POST(request: Request) {
  const reservedRoutes = ['new'];

  try {
    const { title } = await request.json();

    if (reservedRoutes.includes(title)) return NextResponse.json({ isClear: false });

    const currentUser = await getCurrentUser();

    if (!title || !currentUser?.id) throw new Error('Invalid credentials');

    const titleExists = await prisma.project.findFirst({
      where: { ownerId: currentUser.id, AND: { title } },
    });

    if (titleExists) return NextResponse.json({ isClear: false });

    return NextResponse.json({ isClear: true });
  } catch {
    return NextResponse.error();
  }
}
