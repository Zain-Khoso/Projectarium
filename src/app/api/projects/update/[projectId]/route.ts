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

    if (title) updatedProject['title'] = title;
    if (description) updatedProject['description'] = description;
    if (coverImage) updatedProject['coverImage'] = coverImage;
    if (technologies) updatedProject['technologies'] = technologies;
    if (status) updatedProject['status'] = status;
    if (liveDemo) updatedProject['liveDemo'] = liveDemo;
    if (repositoryUrl) updatedProject['repositoryUrl'] = repositoryUrl;

    const project = await prisma.project.update({
      where: { id: projectId },
      data: { ...updatedProject },
    });

    return NextResponse.json({ redirectUrl: `/${currentUser.username}/${project.title}` });
  } catch {
    return NextResponse.error();
  }
}
