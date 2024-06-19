'use client';

// Lib Imports
import { useAuthState } from 'react-firebase-hooks/auth';
import { Trash } from 'lucide-react';

// Local Imports
import { auth } from '@/configs/firebase';
import { LinkButton } from '@/components/Navigation';

// Hooks.
import { useGetProject } from '@/hooks/firebase';

// Types.
type Props = {
  projectId: string;
};

// Component.
export default function DeleleRouteButton({ projectId }: Props) {
  const [user, authLoading, authError] = useAuthState(auth);
  const [projectLoading, projectError, project] = useGetProject(projectId);

  if (
    authLoading ||
    authError ||
    projectLoading ||
    projectError ||
    !user ||
    user?.uid !== project?.creator?.uid
  )
    return '';
  return (
    <LinkButton variant="outline" link={`/project/${projectId}/delete`}>
      <Trash size={16} /> Delete
    </LinkButton>
  );
}
