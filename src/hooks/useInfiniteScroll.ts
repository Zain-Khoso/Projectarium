// Lib Imports.
import { useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

// Types.
import { WholeProject } from '../../types';
type FetchProjectsT = ({
  pageParam,
}: {
  pageParam: string;
}) => Promise<{ projects: WholeProject[]; nextCursor: string | null }>;

// Hook.
export default function useInfiniteScroll() {
  const fetchProjects: FetchProjectsT = useCallback(async ({ pageParam }) => {
    const response = await axios.get(`/api/projects/get-all/${pageParam || 'first-req'}`);

    return response.data;
  }, []);

  const [ref, inView] = useInView();

  const { isLoading, isError, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['infinite-scroll'],
      queryFn: fetchProjects,
      initialPageParam: '',
      getNextPageParam: (lastPage, _) => lastPage.nextCursor,
    });

  useEffect(() => {
    if (isLoading || isFetchingNextPage || !inView) return;

    fetchNextPage();
  }, [isLoading, isFetchingNextPage, inView, fetchNextPage]);

  return { ref, isLoading, isError, data, hasNextPage, isFetchingNextPage };
}
