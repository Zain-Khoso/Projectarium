'use client';

// Lib Imports.
import { useSearchParams } from 'next/navigation';

// Components.
import FeatureSection from './FeatureSection';
import ProjectsTab from './ProjectsTab';
import EndorsementsTab from './EndorsementsTab';
import ContributionsTab from './ContributionsTab';
import BookmarksTab from './BookmarksTab';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
  profileUser: User | null;
};

// Component.
export default function DynamicTab({ currentUser, profileUser }: Props) {
  const tab = useSearchParams().get('tab');

  if (tab === 'projects') return <ProjectsTab profileUser={profileUser} />;

  if (tab === 'contributions') return <ContributionsTab profileUser={profileUser} />;

  if (tab === 'endorsements') return <EndorsementsTab profileUser={profileUser} />;

  if (tab === 'bookmarks') return <BookmarksTab currentUser={currentUser} />;

  return (
    <section className="flex-1 h-full flex flex-col gap-4">
      {/* Featured Endorsements */}
      <FeatureSection
        title="Featured Endorsements"
        subtitle={`Highlighted Creations Handpicked by ${profileUser?.name || profileUser?.username}`}
      >
        <div className="h-full grid place-items-center">
          <span className="font-semibold text-lg">No featured endorsements.</span>
        </div>
      </FeatureSection>

      {/* Featured Projects */}
      <FeatureSection
        title="Featured Projects"
        subtitle={`Highlighted Creations Handpicked by ${profileUser?.name || profileUser?.username}`}
      >
        <div className="h-full grid place-items-center">
          <span className="font-semibold text-lg">No featured projects.</span>
        </div>
      </FeatureSection>

      {/* Featured Contributions */}
      <FeatureSection
        title="Featured Contributions"
        subtitle={`Highlighted Creations Handpicked by ${profileUser?.name || profileUser?.username}`}
      >
        <div className="h-full grid place-items-center">
          <span className="font-semibold text-lg">No featured contributions.</span>
        </div>
      </FeatureSection>
    </section>
  );
}
