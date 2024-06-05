// Local Imports.
import { cn } from '@/utils/utils';
import PostCard from './PostCard';

// Types.
type Props = {
  projects: Record<string, any>[];
};

// Component.
export default function InfiniteScroll({ projects }: Props) {
  return (
    <section
      className={cn(
        'max-w-screen-xl grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-start gap-8 px-2 py-8 mx-auto'
      )}
    >
      {projects.map((project) => (
        <PostCard key={project.id} project={project} />
      ))}
    </section>
  );
}
