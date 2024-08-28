// Lib Imports.
import { permanentRedirect } from 'next/navigation';

// Utils.
import { getSession } from '@/libs/getSession';

// Server action to redirect an authenticated user.
export default async function authenticationRequired(url?: string) {
  try {
    const session = await getSession();

    if (!session?.user?.email) permanentRedirect(url ? url : '/login');
  } catch {
    permanentRedirect(url ? url : '/login');
  }
}
