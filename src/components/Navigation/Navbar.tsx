'use client';

// Lib Imports.
import Link from 'next/link';
import { PlusSquare, Search } from 'lucide-react';

// Local Imports.
import { auth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import UserPopover from './UserPopover';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '../ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '../ui/button';

// Hooks.
import { useAuthState } from 'react-firebase-hooks/auth';

// Types.
type Props = {
  children?: React.ReactNode;
};

// Component.
export default function Navbar({ children }: Props) {
  const [user, userIsLoading, userError] = useAuthState(auth);
  const { toast } = useToast();

  if (userIsLoading)
    return (
      <>
        <nav
          className={cn(
            'w-full min-h-12 max-w-screen-xl flex justify-end items-center gap-2 px-4 py-2 md:py-6 mx-auto md:gap-4'
          )}
        >
          <Skeleton className={cn('w-24 h-10  rounded-xl')} />
          <Skeleton className={cn('w-10 aspect-square rounded-full')} />
          <Skeleton className={cn('w-10 aspect-square rounded-full')} />
        </nav>

        <Separator className={cn('bg-foreground/25')} />
      </>
    );

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
          'w-full min-h-12 max-w-screen-xl flex items-center gap-2 px-4 py-2 md:py-6 mx-auto'
        )}
      >
        {/* Option to have a side ( sheet ) navigation. */}
        {children}

        <div className={cn('flex-1 flex gap-2 items-center justify-end md:gap-4')}>
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

          <UserPopover user={user!} />
        </div>
      </nav>

      <Separator className={cn('bg-foreground/25')} />
    </>
  );
}
