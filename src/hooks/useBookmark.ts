// Lib Imports
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Types.
import { User } from '@prisma/client';
type UseBookmarkT = {
  projectId: string;
  currentUser?: User | null;
  refresh?: boolean;
};

// Hook.
export default function useBookmark({ projectId, currentUser, refresh = false }: UseBookmarkT) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    const list = currentUser?.bookmarkIds || [];

    return list.includes(projectId);
  });

  const toggleBookmark = useCallback(
    async (event: React.MouseEvent<SVGAElement>) => {
      event.preventDefault();

      if (!currentUser) return router.push('/login');

      if (isLoading) return;
      setIsLoading(true);

      try {
        let request;

        if (isBookmarked) request = () => axios.delete(`/api/users/bookmarks/${projectId}`);
        else request = () => axios.post(`/api/users/bookmarks/${projectId}`);

        const response = await request();

        if (refresh) router.refresh();
        else setIsBookmarked(response.data.isBookmarked);
      } catch (error: any) {
        toast.error('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser, isLoading, isBookmarked, projectId, router, refresh]
  );

  return {
    isBookmarked,
    toggleBookmark,
  };
}
