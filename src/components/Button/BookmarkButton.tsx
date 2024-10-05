'use client';

// Hooks.
import useBookmark from '@/hooks/useBookmark';

// Icons.
import { TbBookmark } from 'react-icons/tb';

// Types.
import { User } from '@prisma/client';
type Props = {
  projectId: string;
  currentUser?: User | null;
};

// Component.
export default function BookmarkButton({ projectId, currentUser }: Props) {
  const { isBookmarked, toggleBookmark } = useBookmark({
    projectId,
    currentUser,
  });

  return (
    <TbBookmark
      size={32}
      onClick={toggleBookmark}
      className={`
        absolute 
        top-3 
        right-3 
        stroke-white
        cursor-pointer
        ${isBookmarked ? 'fill-orange-500' : 'fill-neutral-400'}
        `}
    />
  );
}
