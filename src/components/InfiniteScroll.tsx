'use client';

// Lib Imports.
import { Fragment } from 'react';

// Hooks.
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

// Components.
import ProjectCard from './ProjectCard';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser?: User | null;
};

// Component.
export default function InfiniteScroll({ currentUser }: Props) {
  const { ref, isLoading, isError, data, hasNextPage, isFetchingNextPage } = useInfiniteScroll();

  return (
    <>
      <main className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 gap-y-12 place-items-center pt-28 pb-8">
        {data?.pages?.map((page) => (
          <Fragment key={page.nextCursor ?? 'lastPage'}>
            {page.projects.map((project) => (
              <ProjectCard
                key={project.id}
                owner={project.owner}
                currentUser={currentUser}
                project={project}
                likes={project.likes}
                comments={project.comments}
              />
            ))}
          </Fragment>
        ))}
      </main>

      {isLoading || isFetchingNextPage ? <h1 className="text-4xl">Loader</h1> : <></>}
      {isError ? <h1 className="text-4xl text-red-500">Error</h1> : <></>}

      <div ref={ref} className="invisible w-full h-2"></div>
    </>
  );
}
