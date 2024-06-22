'use client';

// Lib Imports.
import { useAuthState } from 'react-firebase-hooks/auth';
import { Edit2Icon } from 'lucide-react';

// Local Imports.
import { auth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Form from './Form';

// Types.
type Props = {
  project: Dictionary;
  projectId: string;
};

// Component.
export default function Edit({ projectId, project }: Props) {
  const [user, isAuthLoading, isAuthError] = useAuthState(auth);

  if (isAuthLoading || isAuthError || !user) return <></>;

  if (user.uid === project.creator.uid)
    return (
      <Dialog>
        <DialogTrigger
          className={cn(
            'flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground gap-2'
          )}
        >
          Edit <Edit2Icon size={12} />
        </DialogTrigger>

        <Form projectId={projectId} project={project} />
      </Dialog>
    );
}
