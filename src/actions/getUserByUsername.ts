// Local Imports.
import prisma from '@/libs/prismadb';

// This action is used to get user data through the provided username on the server.
export default async function getUserByUsername(username: string | null | undefined) {
  if (!username) return null;

  try {
    const currentUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
