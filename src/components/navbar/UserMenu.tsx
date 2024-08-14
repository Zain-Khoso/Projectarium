'use client';

// Lib Imports.
import { useState } from 'react';
import { signOut } from 'next-auth/react';

// Icons.
import { FaUser } from 'react-icons/fa';
import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
import { FaUserPlus } from 'react-icons/fa';

// Components.
import MenuItem from './MenuItem';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
};

// Component.
export default function UserMenu({ currentUser }: Props) {
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
            {currentUser ? (
              <>
                <MenuItem href="/profile" label="Profile" />
                <MenuItem href="/messages" label="Messages" />
                <MenuItem href="/projects" label="Projects" />
                <MenuItem href="/favorites" label="Favorites" />

                <hr />

                <MenuItem
                  href={false}
                  label="Logout"
                  icon={RiLogoutCircleFill}
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem href="/login" label="Login" icon={RiLoginCircleFill} />
                <MenuItem href="/signup" label="Sign up" icon={FaUserPlus} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
