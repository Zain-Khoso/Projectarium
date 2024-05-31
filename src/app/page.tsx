// Local Imports.
import { cn } from '@/utils/utils';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';

// Component.
export default function Home() {
  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <Navbar />

      <section
        className={cn(
          'max-w-screen-xl grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-start gap-8 px-2 py-8 mx-auto'
        )}
      >
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </section>
    </main>
  );
}
