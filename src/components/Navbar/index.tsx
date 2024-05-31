// Lib Imports.
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import User from './User';
import { H3 } from '../ui/typography';
import { Separator } from '../ui/separator';

// Component.
export default function Navbar() {
  return (
    <>
      <nav
        className={cn(
          'w-full min-h-12 max-w-screen-xl flex items-center justify-between px-4 py-2 md:py-6 mx-auto'
        )}
      >
        <Link href="/">
          <H3 className={cn('md:text-4xl')}>Projectarium</H3>
        </Link>

        <User />
      </nav>

      <Separator className={cn('bg-foreground/25')} />
    </>
  );
}
