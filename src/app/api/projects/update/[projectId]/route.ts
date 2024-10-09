// Lib Imports.
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

// Types.
type ParamsT = {
  projectId?: string;
};

// POST Route Handler.
export async function POST(request: Request, { params }: { params: ParamsT }) {
  try {
    const currentUser = await getCurrentUser();
    const reservedRoutes = ['new'];
    const { projectId } = params;
    const { title, description, coverImage, technologies, status, liveDemo, repositoryUrl } =
      await request.json();

    if (!currentUser) return NextResponse.error();
    if (!projectId || typeof projectId !== 'string') NextResponse.error();
    if (reservedRoutes.includes(title)) NextResponse.error();

    const updatedProject: Record<string, any> = {};

    updatedProject['title'] = title;
    updatedProject['description'] = description;
    updatedProject['coverImage'] = coverImage;
    updatedProject['technologies'] = technologies;
    updatedProject['status'] = status;
    updatedProject['liveDemo'] = liveDemo;
    updatedProject['repositoryUrl'] = repositoryUrl;

    const project = await prisma.project.update({
      where: { id: projectId },
      data: { ...updatedProject },
    });

    return NextResponse.json({ redirectUrl: `/${currentUser.username}/${project.title}` });
  } catch {
    return NextResponse.error();
  }
}
