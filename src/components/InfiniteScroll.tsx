// Actions.
import getAllProjects from '@/actions/getAllProjects';

// Components.
import ProjectCard from './ProjectCard';

// Component.
export default async function InfiniteScroll() {
  const projects = await getAllProjects();

  return (
    <main className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 pt-28 pb-8">
      {projects?.map((project) => (
        <ProjectCard key={project.id} owner={project.owner} project={project} />
      ))}
    </main>
  );
}
