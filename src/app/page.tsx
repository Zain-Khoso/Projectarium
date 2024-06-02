// Local Imports.
import { cn } from '@/utils/utils';
import Navbar from '@/components/Navbar';
import InfiniteScroll from '@/components/InfiniteScroll';

// Component.
export default function Home() {
  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <Navbar />

      <InfiniteScroll />
    </main>
  );
}
