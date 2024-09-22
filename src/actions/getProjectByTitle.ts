// Local Imports.
import prisma from '@/libs/prismadb';

// This server action gets a specific project of an specific user respectively to the params.
export default async function getProjectByTitle(userId: string, projectTitle: string) {
  return await prisma.project.findFirst({
    where: { ownerId: userId, AND: { title: projectTitle } },
  });
}
