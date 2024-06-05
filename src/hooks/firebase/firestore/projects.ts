// Lib Imports.
import { useState, useEffect } from 'react';

// Local Imports.
import { fetchDoc } from '@/utils/firebase/firestore';

/*
  This hook takes a single argument, docId.
  And returns, that specific document from projects collection.
*/
export const useGetProject = function (docId: string): [boolean, boolean, Record<string, any>] {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [project, setProject] = useState<Record<string, any>>({});

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
