'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

// Icons.
import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
import { FaUserPlus } from 'react-icons/fa';

// Components.
import MenuItem from './MenuItem';
import Avatar from '../Avatar';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
};

// Component.
export default function UserMenu({ currentUser }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onCreateProject = function () {
    if (currentUser) {
      router.push(`/${currentUser.username}/new`);
      return;
    }

    Swal.fire({
      title: 'Login Required.',
      icon: 'info',
      iconColor: '#0ea5e9',
      confirmButtonColor: '#0ea5e9',
    }).then(() => router.push('/login'));
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          type="button"
          onClick={onCreateProject}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer underline underline-offset-4"
        >
          Create Project
        </button>

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
                <MenuItem href={`/${currentUser.username}`} label="Profile" />
                <MenuItem href="/messages" label="Messages" />
                <MenuItem href={`/${currentUser.username}?tab=projects`} label="Projects" />
                <MenuItem href={`/${currentUser.username}?tab=favorites`} label="Favorites" />
                <MenuItem href={false} onClick={onCreateProject} label="Create Project" />

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
