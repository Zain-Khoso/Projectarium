// Lib Imports.
import { Loader2 } from 'lucide-react';

// Local Imports.
import { cn } from '@/utils/utils';

// Component.
export default function ScreenSpinner() {
  return (
    <section
      className={cn(
        'fixed top-0 left-0 w-dvw min-h-dvh bg-background/40 grid place-items-center z-10 !m-0'
      )}
    >
      <Loader2 size={64} className={cn('animate-spin')} />
    </section>
  );
}
