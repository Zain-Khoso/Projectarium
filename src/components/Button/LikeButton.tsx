'uise client';

// Hooks.
import useLike from '@/hooks/useLike';

// Icons.
import { TbThumbUp } from 'react-icons/tb';

// Types.
import { User, Project, Like } from '@prisma/client';
type Props = {
  currentUser?: User | null;
  project: Project;
  likes: Like[];
};

// Component.
export default function LikeButton({ currentUser, project, likes }: Props) {
  const { isLiked, toggleLike } = useLike({ currentUser, projectId: project.id, likes });

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <span className="text-neutral-600 font-semibold">2.1K</span>

      <div className="h-4 w-[1px] border border-neutral-400"></div>

      <button type="button" onClick={toggleLike} className="-translate-y-[1px]">
        <TbThumbUp
          size={25}
          className={`stroke-[1.5px] stroke-neutral-800 ${isLiked ? 'fill-blue-500' : 'fill-neutral-200'}`}
        />
      </button>
    </div>
  );
}
