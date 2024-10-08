'use client';

// Lib Imports.
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

// Icons.
import { VscSignOut, VscSignIn } from 'react-icons/vsc';
import { FaUserPlus } from 'react-icons/fa';

// Components.
import MenuItem from './MenuItem';
import Avatar from '../Avatar';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser?: User | null;
};

// Component.
export default function UserMenu({ currentUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <Link
          href={currentUser ? `/${currentUser.username}/new` : '/login'}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer underline underline-offset-4"
        >
          Create Project
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="w-fit h-fit border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md overflow-hidden"
        >
          <Avatar src={currentUser?.image} size={40} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[200px] bg-white  border-[1px] border-neutral-200 overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  href={`/${currentUser.username}`}
                  label="Profile"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem href={'/bookmarks'} label="Bookmarks" onClick={() => setIsOpen(false)} />
                <MenuItem
                  href={`/${currentUser.username}/new`}
                  label="Create Project"
                  onClick={() => setIsOpen(false)}
                />

                <hr />

                <MenuItem href={false} label="Logout" icon={VscSignOut} onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  href="/login"
                  label="Login"
                  icon={VscSignIn}
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem
                  href="/signup"
                  label="Sign up"
                  icon={FaUserPlus}
                  onClick={() => setIsOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
