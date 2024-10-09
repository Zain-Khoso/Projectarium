'use client';

import { useState } from 'react';

// Types.
type Props = {
  text: string;
};

// Component.
export default function CopyText({ text }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = function () {
    setIsCopied(true);

    navigator.clipboard.writeText(text);
  };

  return (
    <article className="flex items-center gap-2 justify-between w-full border-2 border-neutral-200 p-3 rounded-md focus-within:border-black">
      <p className="font-bold text-neutral-600 tracking-wide">{text}</p>

      <button
        type="button"
        onClick={handleClick}
        className="p-2 px-3 hover:bg-neutral-100 rounded-md"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </article>
  );
}
