// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';

// Post Route.
export async function POST(request: Request) {
  const reservedRoutes = ['api', 'login', 'signup', 'messages'];

  try {
    const { username, currentUserId } = await request.json();

    if (reservedRoutes.includes(username)) return NextResponse.json({ isClear: false });

    const userExists = await prisma.user.findUnique({ where: { username } });

    if (userExists && userExists.id !== currentUserId) return NextResponse.json({ isClear: false });

    return NextResponse.json({ isClear: true });
  } catch {
    return NextResponse.error();
  }
}
