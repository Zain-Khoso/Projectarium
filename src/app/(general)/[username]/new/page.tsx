// Actions.
import getCurrentUser from '@/actions/getCurrentUser';
import authenticationRequired from '@/actions/authenticationRequired';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ShareProjectForm from './ShareProjectForm';

// Types.
import { Metadata } from 'next';

// Metadata.
export const metadata: Metadata = {
  title: 'Create New Project',
  description:
    'Start a new project on Projectarium and share your innovative ideas with the programming community. Define your project details, add contributors, and showcase your work.',
  keywords: [
    'Projectarium',
    'create project',
    'new project',
    'developer collaboration',
    'programming community',
    'project showcase',
    'software development',
  ],
};

// Component.
export default async function ShareProjectPage() {
  await authenticationRequired();
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container>
        <main className="max-w-screen-lg pt-28 pb-8 mx-auto">
          <Heading
            title="Start Your Next Big Project"
            subtitle="Define your vision, gather your team, and bring your ideas to life."
          />

          <ShareProjectForm currentUser={currentUser} />
        </main>
      </Container>
    </>
  );
}
