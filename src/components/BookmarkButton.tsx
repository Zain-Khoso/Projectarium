'use client';

// Lib Imports.
import { MouseEventHandler, useCallback, useState } from 'react';

// Icons.
import { TbBookmark } from 'react-icons/tb';

// Component.
export default function BookmarkButton() {
  const [isbookmarked, setIsbookmarked] = useState(false);

  const handleBookmark: MouseEventHandler<SVGElement> = useCallback((event) => {
    event.preventDefault();

    setIsbookmarked((value) => !value);
  }, []);

  return (
    <TbBookmark
      size={32}
      onClick={handleBookmark}
      className={`
        absolute 
        top-3 
        right-3 
        stroke-white
        ${isbookmarked ? 'fill-orange-500' : 'fill-neutral-400'}
        `}
    />
  );
}
