// Lib Imports.
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';
import getUserByUsername from '@/actions/getUserByUsername';
import getUserProjects from '@/actions/getUserProjects';

// Utils.
import { getDisplayNameOfUser } from '@/libs/getDisplayNameOfUser';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';
import UserContent from './UserContent';
import Heading from '@/components/Heading';
import ProjectCard from '@/components/ProjectCard';

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

  if (!profileUser) return notFound();

  const projects = await getUserProjects(profileUser.id);

  const displayName = getDisplayNameOfUser(profileUser);

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container>
        <main className="min-h-screen flex flex-col md:flex-row gap-8 pt-28 pb-8">
          <UserContent currentUser={currentUser} profileUser={profileUser} />

          <section className="flex-1 h-full flex flex-col gap-2">
            <Heading
              title="Projects"
              subtitle={
                projects.length === 0
                  ? `${displayName} has no projects.`
                  : `Projects created by ${displayName}`
              }
            />

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 py-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  currentUser={currentUser}
                  owner={project.owner}
                  project={project}
                  likes={project.likes}
                />
              ))}
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}
