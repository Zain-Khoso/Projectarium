// Local Imports.
import { cn } from '@/utils/utils';
import { Navbar } from '@/components/Navigation';
import ProjectsContext from '@/components/InfiniteScroll/context';
import InfiniteScroll from '@/components/InfiniteScroll';

// Component.
export default function Home() {
  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <Navbar />

      <ProjectsContext>
        <InfiniteScroll />
      </ProjectsContext>
    </main>
  );
}
