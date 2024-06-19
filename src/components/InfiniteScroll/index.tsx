'use client';

// Lib Imports.
import { useRef, useEffect, useLayoutEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

// Local Imports.
import { fetchPage } from '@/utils/firebase/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import { cn } from '@/utils/utils';
import { useToast } from '../ui/use-toast';
import SkeletonUI from './SkeletonUI';
import PostCard from './PostCard';

// Component.
export default function InfiniteScroll() {
  // Setting Up infinite query.
  const {
    isLoading,
    isFetchingNextPage,
    isError,
    data: projects,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }: { pageParam: DocumentSnapshot | null }) => fetchPage(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.docs.at(-1),
    refetchOnWindowFocus: false,
  });

  // Component Values.
  const { toast } = useToast();
  const isMounted = useRef(false);
  const scrollElem = useRef(null);

  // Layout Effect for adding the Intersection Observer.
  useLayoutEffect(() => {
    if (!scrollElem.current || isMounted.current) return;
    isMounted.current = true;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '1000px',
      threshold: 1,
    };

    // Intersection Handler.
    const fetchMoreProjects: IntersectionObserverCallback = async function (entries) {
      const [{ isIntersecting }] = entries;

      if (isIntersecting) fetchNextPage();
    };

    const observer = new IntersectionObserver(fetchMoreProjects, observerOptions);

    observer.observe(scrollElem.current);
  }, []);

  // Effect to listen and act for any errors that might accure with the data fetching.
  useEffect(() => {
    if (isError)
      toast({
        variant: 'destructive',
        title: 'Network Problem',
        description: 'Check your internet connection, and try again.',
      });
  }, [isError]);

  return (
    <section
      className={cn(
        'max-w-screen-xl grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-start gap-8 px-2 py-8 mx-auto'
      )}
    >
      {projects?.pages
        .flatMap((snapshot) =>
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        )
        .map((project) => <PostCard key={project.id} project={project} />)}

      {isLoading || isFetchingNextPage || isError ? <SkeletonUI /> : <></>}

      <div ref={scrollElem} className={cn('w-full h-1')}></div>
    </section>
  );
}
