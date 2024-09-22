'uise client';

// Lib Imports.
import { MouseEventHandler, useState } from 'react';

// Icons.
import { TbThumbUp } from 'react-icons/tb';

// Component.
export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike: MouseEventHandler<HTMLButtonElement> = function (event) {
    event.preventDefault();
    setIsLiked((value) => !value);
  };

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <span className="text-neutral-600 font-semibold">2.1K</span>

      <div className="h-4 w-[1px] border border-neutral-400"></div>

      <button type="button" onClick={handleLike} className="-translate-y-[1px]">
        <TbThumbUp
          size={25}
          className={`stroke-[1.5px] stroke-neutral-800 ${isLiked ? 'fill-blue-500' : 'fill-neutral-200'}`}
        />
      </button>
    </div>
  );
}
