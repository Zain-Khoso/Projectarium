'use client';

// Lib Imports.
import { usePathname, useSearchParams } from 'next/navigation';

// Icons
import { GoBook } from 'react-icons/go';
import { RiGitRepositoryFill } from 'react-icons/ri';
import { GrDiamond } from 'react-icons/gr';
import { FiGitMerge } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';

// Components.
import Container from '../Container';
import UserProfileTab from './UserProfileTab';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
  profileUser?: User | null;
};

// Component.
export default function SubnavTabs({ currentUser, profileUser }: Props) {
  const params = useSearchParams();
  const pathname = usePathname();

  const isUserProfile = pathname.match(/^\/[^\/]+$/);

  if (!isUserProfile || pathname === '/messages') return null;

  const tab = params.get('tab');

  return (
    <Container>
      <div className="pt-2 flex flex-row items-center justify-start gap-8 overflow-x-auto">
        <UserProfileTab icon={GoBook} label="Overview" profileUser={profileUser} selected={!tab} />

        <UserProfileTab
          icon={RiGitRepositoryFill}
          label="Projects"
          profileUser={profileUser}
          selected={tab === 'projects'}
        />

        <UserProfileTab
          icon={GrDiamond}
          label="Endorsements"
          profileUser={profileUser}
          selected={tab === 'endorsements'}
        />

        <UserProfileTab
          icon={FiGitMerge}
          label="Contributions"
          profileUser={profileUser}
          selected={tab === 'contributions'}
        />

        {currentUser?.username === profileUser?.username && (
          <UserProfileTab
            icon={MdFavorite}
            label="Favorites"
            profileUser={profileUser}
            selected={tab === 'favorites'}
          />
        )}
      </div>
    </Container>
  );

  return <></>;
}
