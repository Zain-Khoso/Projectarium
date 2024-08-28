// Actions.
import authenticationRequired from '@/actions/authenticationRequired';
import getCurrentUser from '@/actions/getCurrentUser';

// Components.
import Navbar from '@/components/navbar/Navbar';
import UnderDevelopmentPage from '@/components/UnderDevelopmentPage';

// Component.
export default async function Home() {
  await authenticationRequired();
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />
      <UnderDevelopmentPage title="Project create wizard is under development." />
    </>
  );
}
