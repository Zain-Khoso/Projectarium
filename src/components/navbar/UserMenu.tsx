'use client';

// Lib Imports.
import { useState } from 'react';

// Icons.
import { FaUser } from 'react-icons/fa';
import { RiLoginCircleFill } from 'react-icons/ri';
import { FaUserPlus } from 'react-icons/fa';

// Components.
import MenuItem from './MenuItem';

// Component.
export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="w-10 h-10 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md overflow-hidden"
      >
        <FaUser className="w-full h-full scale-90 translate-y-1 fill-neutral-400" />
      </button>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[200px] bg-white  border-[1px] border-neutral-200 overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem href="/login" label="Login" icon={RiLoginCircleFill} />
            <MenuItem href="/signup" label="Sign up" icon={FaUserPlus} />
          </div>
        </div>
      )}
    </div>
  );
}
