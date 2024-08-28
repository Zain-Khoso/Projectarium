// Lib Imports.
import { getServerSession } from 'next-auth/next';

// Local Imports.
import { authOptions } from '@/libs/nextAuthOptions';

// This action gets the current user session on the server.
export async function getSession() {
  return await getServerSession(authOptions);
}
