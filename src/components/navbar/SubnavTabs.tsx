'use client';

// Lib Imports.
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Icons
import { GoBook } from 'react-icons/go';
import { RiGitRepositoryFill } from 'react-icons/ri';
import { GrDiamond } from 'react-icons/gr';
import { FiGitMerge } from 'react-icons/fi';
import { TbBookmarkFilled } from 'react-icons/tb';

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
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const tab = params.get('tab');

  if (currentUser?.username !== profileUser?.username && tab === 'bookmarks')
    router.push(`${currentUser?.username}?tab=bookmarks`);

  const isUserProfile = pathname.match(/^\/[^\/]+$/);

  if (!isUserProfile || pathname === '/messages') return null;

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
            icon={TbBookmarkFilled}
            label="Bookmarks"
            profileUser={profileUser}
            selected={tab === 'bookmarks'}
          />
        )}
      </div>
    </Container>
  );

  return <></>;
}
