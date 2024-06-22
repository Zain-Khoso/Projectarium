'use client';

// Lib Imports.
import { useAuthState } from 'react-firebase-hooks/auth';

// Local Imports.
import { auth } from '@/configs/firebase';
import { Button } from '@/components/ui/button';

// Types.
type Props = {
  creatorId: string;
};

// Component.
export default function Update({ creatorId }: Props) {
  const [user, isAuthLoading, isAuthError] = useAuthState(auth);

  if (isAuthLoading || isAuthError || !user) return <></>;

  if (user.uid === creatorId) return <Button variant="outline">Update</Button>;
}
