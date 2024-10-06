// Utils.
import { formatNumber } from '@/libs/formatters';

// Icons.
import { Comment } from '@prisma/client';
import Link from 'next/link';

// Types.
import { BiSolidComment } from 'react-icons/bi';
type Props = {
  comments: Comment[];
  projectLink: string;
};

// Component.
export default function CommentButton({ comments, projectLink }: Props) {
  const commentsCount = formatNumber(comments.length);

  return (
    <Link href={projectLink} className="flex flex-row gap-2 justify-center items-center">
      <span className="text-neutral-600 font-semibold">{commentsCount}</span>

      <div className="h-4 w-[1px] border border-neutral-400 rounded-full"></div>

      <BiSolidComment
        size={18}
        className={`stroke-[1.5px] stroke-neutral-800 fill-neutral-200 -translate-y-[1px]`}
      />
    </Link>
  );
}
