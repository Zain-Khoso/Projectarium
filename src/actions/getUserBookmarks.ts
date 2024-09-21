// Local Imports.
import prisma from '@/libs/prismadb';

// This server action, gets all the bookmarks according to the bookmark ids provided to it.
export default async function getUserBookmarks(bookmarkIds: string[] = []) {
  return await prisma.project.findMany({
    where: { id: { in: bookmarkIds || [] } },
    include: { owner: true },
  });
}
