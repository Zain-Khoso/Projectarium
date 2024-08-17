// Lib Imports.
import { Suspense } from 'react';

// Components
import Container from '../Container';
import Branding from './Branding';
import Search from './Search';
import UserMenu from './UserMenu';
import UserProfileTabs from './UserProfileTabs';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
  profileUser?: User | null;
};

// Component.
export default function Navbar({ currentUser, profileUser }: Props) {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            {/* Application Logo and Name */}
            <Branding />

            {/* Search & Filtering options */}
            <Search />

            {/* User Option Dropdown */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Suspense>
        <UserProfileTabs currentUser={currentUser} profileUser={profileUser} />
      </Suspense>
    </nav>
  );
}
