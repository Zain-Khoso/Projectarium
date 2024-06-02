// Lib Imports.
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

// Local Imports.
import { firestore } from '@/configs/firebase';
import { useToast } from '@/components/ui/use-toast';

/* 
  This hook provides the enums doc from StaticContent collection inside of firestore.
*/
export function useEnums() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string, string[]>>();

  useEffect(() => {
    (async function () {
      try {
        const docPath = doc(firestore, 'StaticContent/enums');
        const snapshot = await getDoc(docPath);

        setData(snapshot.data());
      } catch (err) {
        setData({
          status: ['Idea', 'In Progress', 'On Hold', 'Completed'],
          tags: [
            'Web Development',
            'AI Development',
            'Mobile Development',
            'Backend Development',
            'Frontend Development',
          ],
        });
        toast({
          title: 'Server Error',
          description: 'Unable to connect to Server, You might notice some inconsistancies.',
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { enumsLoading: isLoading, enums: data };
}
