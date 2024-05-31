// Local Imports.
import { cn } from '@/utils/utils';
import Navbar from '@/components/Navbar';

// Component.
export default function Home() {
  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <Navbar />
    </main>
  );
}
