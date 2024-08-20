// Lib Imports.
import { Metadata } from 'next';
import { Suspense } from 'react';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';
import getUserByUsername from '@/actions/getUserByUsername';

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
        <main className="min-h-screen flex flex-col md:flex-row gap-8 pt-40 lg:pt-48 pb-8">
          <UserContent currentUser={currentUser} profileUser={profileUser} />

          <Suspense>
            <DynamicTabs currentUser={currentUser} profileUser={profileUser} />
          </Suspense>
        </main>
      </Container>
    </>
  );
}
