'use client';

// Lib Imports.
import { useAuthState } from 'react-firebase-hooks/auth';

// Local Imports.
import { auth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Component.
export default function Update() {
  const [user, isAuthLoading, isAuthError] = useAuthState(auth);

  if (isAuthLoading) return <Skeleton className={cn('w-24 h-10')} />;

  if (user) return <Button variant="outline">Update</Button>;
}
