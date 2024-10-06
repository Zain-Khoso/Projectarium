// Local Imports.
import prisma from '@/libs/prismadb';

// This action is used to get a specific user's projects.
export default async function getUserProjects(userId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
      include: { owner: true, likes: true, comments: true },
    });

    if (!projects) return [];

    return projects;
  } catch (error: any) {
    return [];
  }
}
