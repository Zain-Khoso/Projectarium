'use client';

// Lib Imports.
import Link from 'next/link';
import { Button } from '../ui/button';
import { PlusSquare, Search } from 'lucide-react';

// Local Imports.
import { auth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import UserPopover from './UserPopover';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '../ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { H3 } from '../ui/typography';

// Hooks.
import { useAuthState } from 'react-firebase-hooks/auth';

// Component.
export default function Navbar() {
  const [user, userIsLoading, userError] = useAuthState(auth);
  const { toast } = useToast();

  if (userIsLoading) return <Skeleton className={cn('w-10 h-10 rounded-full')} />;

  if (userError)
    toast({
      variant: 'destructive',
      title: 'Server Error',
      description:
        "Sorry, we can't log you in right now. Feel free to explore the app anonymously.",
    });

  return (
    <>
      <nav
        className={cn(
          'w-full min-h-12 max-w-screen-xl flex items-center gap-2 px-4 py-2 md:py-6 mx-auto md:gap-4',
          user ? 'justify-end' : 'justify-between'
        )}
      >
        {user ? (
          <>
            <Link href="/project/share">
              <Button type="button" size={'sm'} className={cn('flex items-center gap-2')}>
                <PlusSquare size={16} />
                Share
              </Button>
            </Link>

            <Link href="/search">
              <Button type="button" className={cn('aspect-square p-2 rounded-full')}>
                <Search size={16} />
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/">
            <H3 className={cn('md:text-4xl')}>Projectarium</H3>
          </Link>
        )}

        <UserPopover user={user!} />
      </nav>

      <Separator className={cn('bg-foreground/25')} />
    </>
  );
}
