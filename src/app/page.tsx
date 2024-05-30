// Local Imports.
import { cn } from '@/utils/utils';
import { H1, Lead } from '@/components/ui/typography';

// Component.
export default function Home() {
  return (
    <main className={cn('min-w-dvw min-h-dvh flex flex-col justify-center items-center gap-2')}>
      <H1>Projectarium</H1>
      <Lead>This Web App is currently under development.</Lead>
    </main>
  );
}
