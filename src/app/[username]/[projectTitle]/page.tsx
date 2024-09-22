// Actions.
import getCurrentUser from '@/actions/getCurrentUser';
import getUserByUsername from '@/actions/getUserByUsername';
import getProjectByTitle from '@/actions/getProjectByTitle';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';

// Types.
import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getDisplayNameOfUser } from '@/libs/getDisplayNameOfUser';
type ParamsT = {
  username?: string;
  projectTitle?: string;
};

// Metadata.
export async function generateMetadata({
  params: { username, projectTitle },
}: {
  params: ParamsT;
}): Promise<Metadata> {
  const user = await getUserByUsername(username);

  if (!user) return permanentRedirect('/');
  else if (!projectTitle) return permanentRedirect(`/${user.username}`);

  const project = await getProjectByTitle(user?.id, projectTitle);

  if (!project) return notFound();

  const displayName = getDisplayNameOfUser(user);

  return {
    title: `${project.title} by ${displayName}`,
    description: project.description,
    keywords: [
      'Projectarium',
      'developer projects',
      'code collaboration',
      'project showcase',
      'programming feedback',
      'software development',
      project.title,
      displayName,
      ...project.technologies,
    ],
    openGraph: {
      title: `${project.title} | Projectarium`,
      description: project.description,
      url: project.liveDemo || '',
      siteName: 'Projectarium',
      images: [
        {
          url: project.coverImage,
          width: 800,
          height: 600,
          alt: `Cover image for ${project.title}`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Projectarium',
      title: `${project.title} | Projectarium`,
      description: project.description,
      images: [project.coverImage || ''],
    },
    authors: [
      {
        name: displayName,
        url: user.website || '',
      },
    ],
    creator: displayName,
    publisher: displayName,
  };
}

// Component.
export default async function IndividualProjectPage({
  params: { username, projectTitle },
}: {
  params: ParamsT;
}) {
  const currentUser = await getCurrentUser();
  const user = await getUserByUsername(username);

  if (!user) return permanentRedirect('/');
  else if (!projectTitle) return permanentRedirect(`/${user.username}`);

  const project = await getProjectByTitle(user?.id, projectTitle);

  if (!project) return notFound();

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container> </Container>
    </>
  );
}
