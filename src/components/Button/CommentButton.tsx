// Icons.
import { BiSolidComment } from 'react-icons/bi';

// Component.
export default function CommentButton() {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <span className="text-neutral-600 font-semibold">1K</span>

      <div className="h-4 w-[1px] border border-neutral-400 rounded-full"></div>

      <button type="button" className="-translate-y-[1px]">
        <BiSolidComment
          size={18}
          className={`stroke-[1.5px] stroke-neutral-800 fill-neutral-200`}
        />
      </button>
    </div>
  );
}
