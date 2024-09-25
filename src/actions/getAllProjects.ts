// Local Imports.
import prisma from '@/libs/prismadb';

// This action is used to get all projects available on the server.
export default async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: true, likes: true },
    });

    if (!projects) return null;

    return projects;
  } catch (error: any) {
    return null;
  }
}
