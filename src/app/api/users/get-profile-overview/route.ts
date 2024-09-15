// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';

// Post route handler.
export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) throw new Error('Invalid Creds.');

    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      include: { owner: true },
    });

    return NextResponse.json({ projects, endorsements: [], contributions: [] });
  } catch {
    return NextResponse.error();
  }
}
