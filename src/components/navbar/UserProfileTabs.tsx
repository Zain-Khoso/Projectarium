'use client';

// Lib Imports.
import { usePathname, useSearchParams } from 'next/navigation';

// Icons
import { GoBook } from 'react-icons/go';
import { RiGitRepositoryFill } from 'react-icons/ri';
import { GrDiamond } from 'react-icons/gr';
import { FiGitMerge } from 'react-icons/fi';

// Components.
import Container from '../Container';
import UserProfileTab from '../UserProfileTab';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
};

// Component.
export default function UserProfileTabs({ currentUser }: Props) {
  const params = useSearchParams();
  const pathname = usePathname();

  const tab = params.get('tab');

  if (!pathname.startsWith('/profiles')) return <></>;

  return (
    <Container>
      <div className="pt-2 flex flex-row items-center justify-start gap-8 overflow-x-auto">
        <UserProfileTab icon={GoBook} label="Overview" currentUser={currentUser} selected={!tab} />

        <UserProfileTab
          icon={RiGitRepositoryFill}
          label="Projects"
          currentUser={currentUser}
          selected={tab === 'projects'}
        />

        <UserProfileTab
          icon={GrDiamond}
          label="Endorsements"
          currentUser={currentUser}
          selected={tab === 'endorsements'}
        />

        <UserProfileTab
          icon={FiGitMerge}
          label="Contributions"
          currentUser={currentUser}
          selected={tab === 'contributions'}
        />
      </div>
    </Container>
  );
}
