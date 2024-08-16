// Lib Imports.
import { Metadata } from 'next';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';
import getUserByUsername from '@/actions/getUserByUsername';

// Components.
import Navbar from '@/components/navbar/Navbar';
import UnderDevelopmentPage from '@/components/UnderDevelopmentPage';

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
export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />
      <UnderDevelopmentPage title="The user section is currently under development." />
    </>
  );
}
