'use client';

// Lib Imports.
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useCallback, useMemo } from 'react';

// Hooks.
import useTechnologies from '@/hooks/useTechnologies';
import useCountries from '@/hooks/useCountries';

// Utils.
import { timeElapsed } from '@/libs/timeElapsed';
import { getDisplayNameOfUser } from '@/libs/getDisplayNameOfUser';

// Icons.
import { FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

// Components.
import Avatar from './Avatar';
import Badge from './Badge';
import { BookmarkButton, LikeButton, CommentButton, ShareButton } from './Button';

// Types.
import { User, Project, Like } from '@prisma/client';
type Props = {
  owner: User;
  currentUser?: User | null;
  project: Project;
  likes: Like[];
};

// Component.
export default function ProjectCard({ owner, currentUser, project, likes }: Props) {
  const router = useRouter();
  const { getByValue: getTechnologyByValue } = useTechnologies();
  const { getByValue: getCountryByValue } = useCountries();

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

  const ownerLabel = useMemo(() => getDisplayNameOfUser(owner), [owner]);

  const ownerCountry = useMemo(() => {
    if (!owner.locationValue) return null;

    return getCountryByValue(owner.locationValue);
  }, [owner.locationValue, getCountryByValue]);

  const handleOwnerClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();

      router.push(`/${owner.username}`);
    },
    [owner.username, router]
  );

  return (
    <div className="w-full h-full max-w-[320px] flex flex-col overflow-hidden group">
      <Link
        href={`/${owner.username}/${project.title}`}
        className="relative rounded-lg overflow-hidden w-full h-[200px]"
      >
        <Image
          alt={`Cover image of project ${project.title}`}
          src={project.coverImage}
          fill
          className="w-full h-full object-cover object-center group-hover:scale-110 transition"
        />

        {owner.id !== currentUser?.id && (
          <BookmarkButton projectId={project.id} currentUser={currentUser} />
        )}
      </Link>

      <section className="w-full flex flex-col gap-4 px-2 py-4">
        <Link
          href={`/${owner.username}/${project.title}`}
          className="flex flex-row items-center justify-between"
        >
          <h4 className="font-bold text-xl">{projectTitle}</h4>

          <Badge label={project.status} outline={project.status !== 'COMPLETED'} />
        </Link>

        <div className="flex flex-row items-start gap-1">
          <FaCalendarCheck size={16} className="fill-neutral-600" />

          <span className="font-medium text-sm text-neutral-600">Created {timePassed}</span>
        </div>

        <div className="flex flex-row items-start gap-1">
          <FaClipboardList size={16} className="fill-neutral-600" />

          <span className="font-medium text-sm text-neutral-600">With {createdWith}, etc...</span>
        </div>

        <div
          onClick={handleOwnerClick}
          className="h-11 flex flex-row items-center gap-2 cursor-pointer"
        >
          <div className="w-fit h-fit rounded-full border border-neutral-300">
            <Avatar src={owner.image ? owner.image : '/images/user-placeholder.png'} size={35} />
          </div>

          <div className="flex-1 h-full flex-col items-start justify-between">
            <h4 className="font-bold text-md text-neutral-600">{ownerLabel}</h4>

            {ownerCountry && (
              <div className="flex flex-row items-center gap-1">
                <FaLocationDot size={12} className="fill-neutral-600" />

                <span className="font-medium text-sm text-neutral-600">
                  {ownerCountry.flag} {ownerCountry.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr />

      <section className="w-full flex flex-row justify-between items-center pt-4">
        <LikeButton currentUser={currentUser} project={project} likes={likes} />

        <CommentButton />

        <ShareButton owner={owner} project={project} />
      </section>
    </div>
  );
}
