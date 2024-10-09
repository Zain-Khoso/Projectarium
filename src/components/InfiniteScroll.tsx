'use client';

// Lib Imports.
import { Fragment, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

// Utils.
import infiniteScrollQuery from '@/libs/infiniteScrollQuery';

// Components.
import ProjectCard from './ProjectCard';

// Types.
import { User } from '@prisma/client';
import { WholeProject } from '../../types';
type Props = {
  currentUser?: User | null;
};

// Component.
export default function InfiniteScroll({ currentUser }: Props) {
  const [ref, inView] = useInView();

  const { isLoading, isError, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['infinite-scroll'],
      queryFn: infiniteScrollQuery,
      initialPageParam: '',
      getNextPageParam: (lastPage, _) => lastPage.nextCursor,
    });

  useEffect(() => {
    if (isLoading || isFetchingNextPage || !inView) return;

    fetchNextPage();
  }, [isLoading, isFetchingNextPage, inView, fetchNextPage]);

  return (
    <>
      <main className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 gap-y-12 place-items-center pt-28 pb-8">
        {data?.pages?.map((page) => (
          <Fragment key={page.nextCursor ?? 'lastPage'}>
            {page.projects.map((project: WholeProject) => (
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
