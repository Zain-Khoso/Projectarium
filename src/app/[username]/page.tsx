// Lib Imports.
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';
import getUserByUsername from '@/actions/getUserByUsername';

// Icons.
import { TbError404 } from 'react-icons/tb';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';
import UserContent from './UserContent';
import DynamicTabs from './DynamicTabs';

// Types.
type Props = {
  params: {
    username?: string;
  };
};

// Metadata.
export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
  let currentUser;

  const currentUserData = await getCurrentUser();

  if (currentUserData?.username === username) currentUser = currentUserData;
  else currentUser = await getUserByUsername(username);

  return {
    title: currentUser?.username,
    description: currentUser?.bio,
    keywords: [
      'Projectarium',
      'profile',
      'programmer profile',
      'developer portfolio',
      'showcase projects',
      'contributor profile',
      'user profile',
      'programming community',
    ],
  };
}

// Component.
export default async function ProfilePage({ params: { username } }: Props) {
  const currentUser = await getCurrentUser();
  let profileUser;

  if (currentUser?.username === username) profileUser = currentUser;
  else profileUser = await getUserByUsername(username);

  return (
    <>
      <Navbar currentUser={currentUser} profileUser={profileUser} />

      <Container>
        {profileUser ? (
          <main className="min-h-screen flex flex-col md:flex-row gap-8 pt-40 lg:pt-44 pb-8">
            <UserContent currentUser={currentUser} profileUser={profileUser} />

            <Suspense>
              <DynamicTabs currentUser={currentUser} profileUser={profileUser} />
            </Suspense>
          </main>
        ) : (
          <main className="min-h-screen pt-40 lg:pt-44 pb-8 flex flex-col items-center gap-4">
            <TbError404 size={120} className="fill-rose-500" />
            <h1 className="text-4xl text-neutral-600">User does not exist.</h1>
            <p className="text-neutral-600 font-light">
              Go back to{' '}
              {currentUser ? (
                <Link href={`/${currentUser.username}`} className="text-sky-500 font-semibold">
                  Your profile
                </Link>
              ) : (
                <Link href={'/'} className="text-sky-500 font-semibold">
                  Home page
                </Link>
              )}
            </p>
          </main>
        )}
      </Container>
    </>
  );
}
