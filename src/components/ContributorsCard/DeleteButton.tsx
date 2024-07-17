'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TrashIcon } from 'lucide-react';

// Local Imports.
import { auth, firestore } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import { Skeleton } from '../ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Types.
type Props = {
  projectId: string;
  contributorId: string;
  uid: string;
};

// Component.
export default function DeleteButton({ contributorId, projectId, uid }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [user, isLoading, isError] = useAuthState(auth);

  const router = useRouter();
  const { toast } = useToast();

  const removeContributor: MouseEventHandler<HTMLButtonElement> = async function (event) {
    event.stopPropagation();
    setIsDeleting(true);

    try {
      const contributor = doc(firestore, `projects/${projectId}/contributors/${contributorId}`);
      await deleteDoc(contributor);

      router.refresh();
    } catch {
      toast({ title: 'Unable to remove contributor.' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <Skeleton className={cn('w-12 h-8')} />;

  if (!user || isError) return <></>;

  if (user.uid === uid)
    return (
      <Button
        type="button"
        variant={'outline'}
        size={'icon'}
        disabled={isDeleting}
        onClick={removeContributor}
      >
        <TrashIcon size={16} />
      </Button>
    );
}
