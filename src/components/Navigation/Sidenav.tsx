// Lib Imports.
import Link from 'next/link';

// Local Imports.
import { H3 } from '@/components/ui/typography';
import { cn } from '@/utils/utils';
import { Separator } from '@/components/ui/separator';

// Component.
export default function Sidenav({ children }: Props) {
  return (
    <header className={cn('hidden w-80 h-full lg:flex flex-col gap-4 py-8 px-4')}>
      <Link href="/">
        <H3 className={cn('py-2')}>Projectarium</H3>
      </Link>

      <Separator className={cn('mb-8')} />

      {children}
    </header>
  );
}
