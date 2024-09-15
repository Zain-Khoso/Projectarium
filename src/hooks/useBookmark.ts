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
};

// Hook.
export default function useBookmark({ projectId, currentUser }: UseBookmarkT) {
  const router = useRouter();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    const list = currentUser?.bookmarkIds || [];

    return list.includes(projectId);
  });

  const toggleBookmark = useCallback(
    async (event: React.MouseEvent<SVGAElement>) => {
      event.preventDefault();

      if (!currentUser) return router.push('/login');

      try {
        let request;

        if (isBookmarked) request = () => axios.delete(`/api/users/bookmarks/${projectId}`);
        else request = () => axios.post(`/api/users/bookmarks/${projectId}`);

        const response = await request();

        setIsBookmarked(response.data.isBookmarked);
      } catch (error: any) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, isBookmarked, projectId, router]
  );

  return {
    isBookmarked,
    toggleBookmark,
  };
}
