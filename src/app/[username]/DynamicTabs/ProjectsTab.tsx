'use client';

// Lib Imports.
import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Components.
import Heading from '@/components/Heading';
import ProjectCard from '@/components/ProjectCard';

// Types.
import { User } from '@prisma/client';
type Props = {
  profileUser: User | null;
  currentUser: User | null;
};

// Component.
export default function ProjectsTab({ profileUser, currentUser }: Props) {
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

  const getUserProjects = async function () {
    const response = await axios.get('/api/projects/get-user-projects', {
      params: {
        userId: profileUser?.id,
      },
    });
    return response.data;
  };

  const {
    isLoading,
    isError,
    data: projects,
  } = useQuery({
    queryKey: ['currentUserProject'],
    queryFn: async () => await getUserProjects(),
  });

  return (
    <section className="flex-1 h-full flex flex-col gap-4">
      <Heading title={headingTitle} />

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 py-8">
        {projects?.map((project: any) => (
          <ProjectCard key={project.id} owner={project.owner} project={project} />
        ))}
      </div>
    </section>
  );
}
