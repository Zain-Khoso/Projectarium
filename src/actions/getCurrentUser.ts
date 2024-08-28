// Local Imports.
import prisma from '@/libs/prismadb';

// Utils.
import { getSession } from '@/libs/getSession';

// This action is used to get user data on the server.
export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
