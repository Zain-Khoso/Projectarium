'use client';

// Lib Imports.
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PlusCircleIcon } from 'lucide-react';

// Local Imports.
import { auth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Form from './Form';

// Types.
type Props = {
  projectId: string;
  uid: string;
};

// Component.
export default function AddContributor({ projectId, uid }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, isAuthLoading, isAuthError] = useAuthState(auth);

  if (isAuthLoading || isAuthError || !user) return <></>;

  if (user.uid === uid)
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          className={cn(
            'flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary2 h-10 px-4 py-2 self-end'
          )}
        >
          <PlusCircleIcon size={16} />
          Add Contributor
        </DialogTrigger>

        <Form projectId={projectId} setDialogOpen={setDialogOpen} />
      </Dialog>
    );
}
