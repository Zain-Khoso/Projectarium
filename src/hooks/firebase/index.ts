// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DocumentData } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

// Local Imports.
import { auth } from '@/configs/firebase';
import { fetchDoc } from '@/utils/firebase/firestore';
import { useToast } from '@/components/ui/use-toast';

/* 
  This hook provides the enums doc from StaticContent collection inside of firestore.
*/
export function useEnums(): [boolean, DocumentData | undefined] {
  // Default data to fallback to if something goes wrong.
  const initialData = {
    status: ['Idea', 'In Progress', 'On Hold', 'Completed'],
    tags: [
      'Web Development',
      'AI Development',
      'Mobile Development',
      'Backend Development',
      'Frontend Development',
    ],
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['enums'],
    queryFn: async () => await fetchDoc('StaticContent', 'enums'),
    initialData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        title: 'Server Error',
        description: 'Unable to connect to Server, You might notice some inconsistancies.',
      });
  }, [isError]);

  return [isLoading, data];
}

/*
  This hook takes a single argument, docId.
  And returns, that specific document from projects collection.
*/
export const useGetProject = function (docId: string): [boolean, boolean, Dictionary] {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [project, setProject] = useState<Dictionary>({});

  useEffect(() => {
    (async function () {
      try {
        const result = await fetchDoc('projects', docId);
        setProject({ id: docId, ...result });
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return [isLoading, error, project];
};

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
