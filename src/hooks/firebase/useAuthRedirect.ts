// Lib Imports.
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Local Imports.
import { auth } from '@/configs/firebase';
import { useToast } from '@/components/ui/use-toast';

/*
  This hook checks if a user is logged in, If no then redirects them to register.ts .
*/
export function useAuthRedirect() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, isLoading, error] = useAuthState(auth);

  useEffect(() => {
    if (!isLoading && (!user || error)) {
      toast({
        title: 'Login Required',
      });
      router.push('/register');
    }
  }, [isLoading, user]);
}
