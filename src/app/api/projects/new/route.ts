// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

// Post Route.
export async function POST(request: Request) {
  const reservedRoutes = ['new'];

  try {
    const { title, coverImage, description, technologies, status } = await request.json();

    if (reservedRoutes.includes(title)) return NextResponse.json({ isClear: false });

    const currentUser = await getCurrentUser();

    if (!title || !coverImage || !description || !technologies || !status || !currentUser?.id)
      throw new Error('Invalid credentials.');

    const titleExists = await prisma.project.findFirst({
      where: { ownerId: currentUser?.id, AND: { title } },
    });

    if (titleExists) throw new Error('Invalid credentials.');

    const project = await prisma.project.create({
      data: { title, coverImage, description, technologies, status, ownerId: currentUser?.id },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.error();
  }
}
