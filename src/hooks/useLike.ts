// Lib Imports
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Types.
import { User, Like } from '@prisma/client';
type UseLikeT = {
  currentUser?: User | null;
  projectId: string;
  likes: Like[];
};

// Hook.
export default function useLike({ currentUser, projectId, likes }: UseLikeT) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    const liked = likes.find((like) => like.userId === currentUser?.id || '');

    return liked ? true : false;
  });

  const toggleLike: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      event.preventDefault();

      if (!currentUser) return router.push('/login');

      if (isLoading) return;
      setIsLoading(true);

      try {
        let request;

        if (isLiked) request = () => axios.delete(`/api/likes/${projectId}`);
        else request = () => axios.post(`/api/likes/${projectId}`);

        const response = await request();

        setIsLiked(response.data.isLiked);
        setLikesCount((value) => (response.data.isLiked ? ++value : --value));
      } catch (error: any) {
        toast.error('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser, isLoading, isLiked, projectId, router]
  );

  return {
    isLiked,
    toggleLike,
    likesCount,
  };
}
