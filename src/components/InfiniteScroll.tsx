// Components.
import ProjectCard from './ProjectCard';

// Component.
export default function InfiniteScroll() {
  return (
    <main className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 pt-28 pb-8">
      <ProjectCard />
    </main>
  );
}
