// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';

// Post Route.
export async function POST(request: Request) {
  const reservedRoutes = ['new'];

  try {
    const { title, coverImage, description, technologies, status, ownerId } = await request.json();

    if (reservedRoutes.includes(title)) return NextResponse.json({ isClear: false });

    if (!title || !coverImage || !description || !technologies || !status || !ownerId)
      throw new Error('Invalid credentials.');

    const titleExists = await prisma.project.findFirst({
      where: { ownerId, AND: { title } },
    });

    if (titleExists) throw new Error('Invalid credentials.');

    const project = await prisma.project.create({
      data: { title, coverImage, description, technologies, status, ownerId },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.error();
  }
}
