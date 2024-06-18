'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Local Imports.
import { auth } from '@/configs/firebase';
import { removeDoc } from '@/utils/firebase/firestore';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import ScreenSpinner from '@/components/ScreenSpinner';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/utils';

// Types.
type Props = {
  project: Dictionary;
};

// Component.
export default function DeleteButton({ project }: Props) {
  const [user, isAuthLoading, authError] = useAuthState(auth);

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const deleteProject = async function () {
    setLoading(true);

    try {
      await removeDoc('projects', project.id);

      router.push(`/user/${user?.uid}`);
    } catch {
      toast({
        title: 'Error',
        description: 'Unable to delete this post, Check you internet connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthLoading) return <Skeleton className={cn('w-32 h-10 rounded-lg')} />;

  if (authError || !user) {
    toast({ title: 'You need to Login.' });

    router.push('/register');
  }

  if (user?.uid !== project.creator.uid) router.push(`/project/${project.id}`);

  return (
    <>
      <Button variant="destructive" onClick={deleteProject}>
        Yes, Delete it.
      </Button>

      {loading ? <ScreenSpinner /> : ''}
    </>
  );
}
