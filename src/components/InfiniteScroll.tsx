// Actions.
import getAllProjects from '@/actions/getAllProjects';

// Components.
import ProjectCard from './ProjectCard';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser?: User | null;
};

// Component.
export default async function InfiniteScroll({ currentUser }: Props) {
  const projects = await getAllProjects();

  return (
    <main className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 gap-y-12 place-items-center pt-28 pb-8">
      {projects?.map((project) => (
        <ProjectCard
          key={project.id}
          owner={project.owner}
          currentUser={currentUser}
          project={project}
          likes={project.likes}
          comments={project.comments}
        />
      ))}
    </main>
  );
}
