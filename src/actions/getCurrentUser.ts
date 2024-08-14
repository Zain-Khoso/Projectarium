// Lib Imports.
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/nextAuthOptions';

// Local Imports.
import prisma from '@/libs/prismadb';

// This action gets the current user session on the server.
export async function getSession() {
  return await getServerSession(authOptions);
}

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
