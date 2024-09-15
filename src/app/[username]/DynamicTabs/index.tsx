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
import Heading from '@/components/Heading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { SyncLoader } from 'react-spinners';
import ProjectCard from '@/components/ProjectCard';
type Props = {
  currentUser: User | null;
  profileUser: User | null;
};

// Component.
export default function DynamicTab({ currentUser, profileUser }: Props) {
  const tab = useSearchParams().get('tab');

  const getProfileOverview = async function () {
    const response = await axios.post('/api/users/get-profile-overview', {
      userId: profileUser?.id,
    });
    return response.data;
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['profileOverview'],
    queryFn: async () => await getProfileOverview(),
  });

  const headingTitle = useMemo(() => {
    if (profileUser?.username === currentUser?.username) return 'Your Projects';
    else if (profileUser?.name) return profileUser.name + "'s Projects";
    else if (profileUser?.name) return profileUser.name + "'s Projects";
    else if (profileUser?.username) {
      if (profileUser.username.length > 20)
        return profileUser.username.slice(0, 17) + "...'s Projects";
      else return profileUser.username;
    } else return 'Project';
  }, [profileUser?.name, profileUser?.username, currentUser?.username]);

  if (tab === 'projects')
    return <ProjectsTab profileUser={profileUser} currentUser={currentUser} />;

  if (tab === 'contributions') return <ContributionsTab profileUser={profileUser} />;

  if (tab === 'endorsements') return <EndorsementsTab profileUser={profileUser} />;

  if (tab === 'bookmarks') return <BookmarksTab currentUser={currentUser} />;

  if (isLoading)
    return (
      <section className="flex-1 h-[25vh] flex items-center justify-center">
        <SyncLoader />
      </section>
    );

  if (isError)
    return (
      <Heading
        title={headingTitle}
        subtitle="Something went wrong on our end. Please try again later."
      />
    );

  return (
    <section className="flex-1 h-full flex flex-col gap-4">
      {/* Featured Endorsements */}
      {data.endorsements.length > 0 && (
        <FeatureSection
          title="Featured Endorsements"
          subtitle={`Highlighted Endorsements Handpicked by ${profileUser?.name || profileUser?.username}`}
        >
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 py-4">
            {data.exdorsements.map((endorsement: any) => (
              <ProjectCard
                key={endorsement.id}
                owner={endorsement.owner}
                currentUser={currentUser}
                project={endorsement}
              />
            ))}
          </div>
        </FeatureSection>
      )}

      {/* Featured Contributions */}
      {data.contributions.length > 0 && (
        <FeatureSection
          title="Featured Contributions"
          subtitle={`Highlighted Contributions Handpicked by ${profileUser?.name || profileUser?.username}`}
        >
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 py-4">
            {data.contributions.map((contribution: any) => (
              <ProjectCard
                key={contribution.id}
                owner={contribution.owner}
                currentUser={currentUser}
                project={contribution}
              />
            ))}
          </div>
        </FeatureSection>
      )}

      {/* Featured Projects */}
      {data.projects.length > 0 && (
        <FeatureSection
          title="Featured Projects"
          subtitle={`Highlighted Projects Handpicked by ${profileUser?.name || profileUser?.username}`}
        >
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 py-4">
            {data.projects.map((project: any) => (
              <ProjectCard
                key={project.id}
                owner={project.owner}
                currentUser={currentUser}
                project={project}
              />
            ))}
          </div>
        </FeatureSection>
      )}
    </section>
  );
}
