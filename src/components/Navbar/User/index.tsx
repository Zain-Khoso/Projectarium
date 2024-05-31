'use client';

// Lib Imports.
import { useAuthState } from 'react-firebase-hooks/auth';

// Local Imports.
import { cn } from '@/utils/utils';
import { auth } from '@/configs/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import UnAuthenticatedUI from './UnAuthenticatedUI';
import AuthenticatedUI from './AuthenticatedUI';

// Component.
export default function User() {
  const [user, userIsLoading, userError] = useAuthState(auth);
  const { toast } = useToast();

  if (userIsLoading) return <Skeleton className={cn('w-10 h-10 rounded-full')} />;

  if (userError || !user) {
    if (userError)
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description:
          "Sorry, we can't log you in right now. Feel free to explore the app anonymously.",
      });

    return <UnAuthenticatedUI />;
  }

  return <AuthenticatedUI user={user} />;
}
