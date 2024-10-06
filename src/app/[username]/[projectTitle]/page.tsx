// Lib Imports.
import { notFound, permanentRedirect } from 'next/navigation';
import Image from 'next/image';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';
import getUserByUsername from '@/actions/getUserByUsername';
import getProjectByTitle from '@/actions/getProjectByTitle';

// Utils.
import { getDisplayNameOfUser } from '@/libs/getDisplayNameOfUser';

// Icons.
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';
import Header from './Header';
import EditProjectButton from './EditProjectButton';
import DeleteProjectButton from './DeleteProjectButton';
import UserRibbon from '@/components/UserRibbon';
import Badge from '@/components/Badge';
import { LinkButton, BookmarkButton, ShareButton, LikeButton } from '@/components/Button';

// Types.
import { Metadata } from 'next';
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

      <Container>
        <main className="max-w-screen-lg flex flex-col gap-8 pt-28 pb-8 mx-auto">
          <section className="w-full flex flex-row items-center justify-between">
            <Header heading={project.title} technologies={project.technologies} />
          </section>

          <section className="w-full flex flex-col gap-8">
            <div className="relative rounded-lg overflow-hidden w-full aspect-video">
              <Image
                alt={`Cover image of project ${project.title}`}
                src={project.coverImage}
                fill
                className="w-full h-full object-cover object-center hover:scale-110 transition"
              />

              {project.owner.id !== currentUser?.id && (
                <BookmarkButton projectId={project.id} currentUser={currentUser} />
              )}
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center justify-center gap-4 md:gap-8">
                <LikeButton currentUser={currentUser} project={project} likes={project.likes} />
                <ShareButton project={project} owner={project.owner} />
              </div>

              <Badge label={project.status} outline={project.status !== 'COMPLETED'} />
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <UserRibbon owner={project.owner} size="lg" />

              {currentUser?.id === project.ownerId ? (
                <div className="flex flex-row items-center gap-2">
                  <EditProjectButton project={project} />

                  <DeleteProjectButton project={project} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </section>

          <section className="w-full flex flex-col gap-8">
            <p className="w-full text-lg">{project.description}</p>

            <div className="w-full flex flex-row items-center gap-2 md:max-w-[350px]">
              {project.liveDemo ? (
                <LinkButton
                  label="Live Demo"
                  icon={FaExternalLinkSquareAlt}
                  href={project.liveDemo}
                  target="_blank"
                />
              ) : (
                <></>
              )}

              {project.repositoryUrl ? (
                <LinkButton
                  label="Source Code"
                  icon={FaExternalLinkSquareAlt}
                  href={project.repositoryUrl}
                  target="_blank"
                  outline
                />
              ) : (
                <></>
              )}
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}
