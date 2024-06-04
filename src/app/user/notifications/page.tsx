// Local Imports.
import { cn } from '@/utils/utils';
import { H1, Lead } from '@/components/ui/typography';

// Component.
export default function Notifications() {
  return (
    <main className={cn('min-w-dvw min-h-dvh flex flex-col justify-center items-center gap-2')}>
      <H1>Notifications</H1>
      <Lead>This page is currently under development.</Lead>
    </main>
  );
}
