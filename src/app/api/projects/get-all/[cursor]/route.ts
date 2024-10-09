// Lib Imports.
import { NextResponse } from 'next/server';

// Local Imports.
import prisma from '@/libs/prismadb';

// Types.
type ParamsT = {
  cursor: string;
};

// GET route handler for infinite projects scroll.
export async function GET(request: Request, { params }: { params: ParamsT }) {
  const { cursor } = params;
  const isFirstFetch = cursor === 'first-req';

  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: true, likes: true, comments: true },
      take: 8,
      cursor: isFirstFetch ? undefined : { id: cursor },
      skip: isFirstFetch ? 0 : 1,
    });

    return NextResponse.json({
      projects,
      nextCursor: projects.length === 0 ? null : projects.at(-1)?.id,
    });
  } catch {
    return NextResponse.error();
  }
}
