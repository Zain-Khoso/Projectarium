'use client';

// Lib Imports.
import { useState } from 'react';

// Icons.
import { TbDots, TbEdit, TbTrash } from 'react-icons/tb';
import ControlOption from './ControlOption';

// Component.
export default function CommentControls() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="p-1 rounded-md hover:bg-neutral-100"
      >
        <TbDots />
      </button>

      <div
        className={`${isOpen ? 'flex' : 'hidden'} flex-col absolute bg-white shadow-[0_0_0.5rem_rgba(0,0,0,0.15)] rounded-lg mb-2 overflow-hidden`}
      >
        <ControlOption label="Edit" icon={TbEdit} onClick={() => {}} />
        <ControlOption label="Delete" icon={TbTrash} onClick={() => {}} />
      </div>
    </div>
  );
}
