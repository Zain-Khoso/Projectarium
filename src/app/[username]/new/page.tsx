// Actions.
import authenticationRequired from '@/actions/authenticationRequired';
import getCurrentUser from '@/actions/getCurrentUser';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import NewProjectForm from './NewProjectForm';

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
export default async function NewProjectPage() {
  await authenticationRequired();
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container>
        <main className="min-h-screen pt-28 pb-8 flex flex-col gap-8">
          <Heading
            title="Start Your Next Big Project."
            subtitle="Define your vision, gather your team, and bring your ideas to life."
          />

          <NewProjectForm />
        </main>
      </Container>
    </>
  );
}
