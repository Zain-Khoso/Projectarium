'uise client';

// Lib Imports.
import { MouseEventHandler, useState } from 'react';

// Icons.
import { FaShare } from 'react-icons/fa';

// Component.
export default function ShareButton() {
  const handleShare: MouseEventHandler<HTMLButtonElement> = function (event) {
    event.preventDefault();
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex flex-row gap-2 justify-center items-center"
    >
      <div className="-translate-y-[1px]">
        <FaShare size={18} className={`stroke-[1.5px] stroke-neutral-800 fill-neutral-600`} />
      </div>

      <div className="h-4 w-[1px] border border-neutral-400"></div>

      <span className="text-neutral-600 font-semibold">Share</span>
    </button>
  );
}
