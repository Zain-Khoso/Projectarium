'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

// Local Imports.
import { firestore } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import PostCard from './PostCard';
import { useToast } from './ui/use-toast';
import { Skeleton } from './ui/skeleton';

// Component.
export default function InfiniteScroll() {
  const router = useRouter();
  const { toast } = useToast();

  // Custom States.
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const projectsQ = query(
          collection(firestore, 'projects'),
          where('lifecycleStatus', '==', 'Published'),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(projectsQ);

        setProjects(
          snapshot.docs.map((item) => {
            return { id: item.id, ...item.data() };
          })
        );
        setIsLoading(false);
      } catch {
        toast({
          variant: 'destructive',
          title: 'Connection Error',
          description: 'You have an unstable network.',
        });

        setTimeout(() => router.refresh(), 3000);
      }
    })();
  }, []);

  return (
    <section
      className={cn(
        'max-w-screen-xl grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-start gap-8 px-2 py-8 mx-auto'
      )}
    >
      {isLoading || !projects ? (
        <>
          <Skeleton className={cn('w-full min-h-[500px] rounded-lg')} />
          <Skeleton className={cn('w-full min-h-[500px] rounded-lg')} />
          <Skeleton className={cn('w-full min-h-[500px] rounded-lg')} />
        </>
      ) : (
        projects.map((project) => <PostCard key={project.id} project={project} />)
      )}
    </section>
  );
}
