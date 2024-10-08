'use client';

// Lib Imports.
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

// Hooks.
import useTechnologies from '@/hooks/useTechnologies';

// Utils.
import { timeElapsed } from '@/libs/timeElapsed';

// Icons.
import { FaCalendarCheck, FaClipboardList } from 'react-icons/fa';

// Components.
import Badge from './Badge';
import { BookmarkButton, LikeButton, CommentButton, ShareButton } from './Button';

// Types.
import { User, Project, Like, Comment } from '@prisma/client';
import UserRibbon from './UserRibbon';
type Props = {
  owner: User;
  currentUser?: User | null;
  project: Project;
  likes: Like[];
  comments: Comment[];
};

// Component.
export default function ProjectCard({ owner, currentUser, project, likes, comments }: Props) {
  const { getByValue: getTechnologyByValue } = useTechnologies();

  const projectTitle = useMemo(
    () => (project.title.length > 20 ? project.title.slice(0, 17) + '...' : project.title),
    [project.title]
  );

  const timePassed = useMemo(() => timeElapsed(project.createdAt), [project.createdAt]);

  const createdWith = useMemo(() => {
    const selectedTechnologies = project.technologies
      .slice(0, 3)
      .map((technology) => getTechnologyByValue(technology)?.label);

    return selectedTechnologies.join(', ');
  }, [project.technologies, getTechnologyByValue]);

  return (
    <div className="w-full h-full max-w-[320px] flex flex-col overflow-hidden group">
      <Link
        href={`/${owner.username}/${project.title}`}
        className="relative rounded-lg overflow-hidden w-full h-[200px]"
      >
        <Image
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 25vw"
          alt={`Cover image of project ${project.title}`}
          src={project.coverImage}
          className="w-full scale-110 h-full object-cover object-center group-hover:scale-[120%] transition"
        />

        {owner.id !== currentUser?.id && (
          <BookmarkButton projectId={project.id} currentUser={currentUser} />
        )}
      </Link>

      <Link
        href={`/${owner.username}/${project.title}`}
        className="w-full flex flex-col gap-4 px-2 py-4"
      >
        <div className="flex flex-row items-center justify-between">
          <h4 className="font-bold text-xl">{projectTitle}</h4>

          <Badge label={project.status} outline={project.status !== 'COMPLETED'} />
        </div>

        <div className="flex flex-row items-start gap-1">
          <FaCalendarCheck size={16} className="fill-neutral-600" />

          <span className="font-medium text-sm text-neutral-600">Created {timePassed}</span>
        </div>

        <div className="flex flex-row items-start gap-1">
          <FaClipboardList size={16} className="fill-neutral-600" />

          <span className="font-medium text-sm text-neutral-600">With {createdWith}, etc...</span>
        </div>

        <UserRibbon owner={owner} />
      </Link>

      <hr />

      <section className="w-full flex flex-row justify-between items-center pt-4">
        <LikeButton currentUser={currentUser} project={project} likes={likes} />

        <CommentButton comments={comments} projectLink={`/${owner.username}/${project.title}`} />

        <ShareButton owner={owner} project={project} />
      </section>
    </div>
  );
}
