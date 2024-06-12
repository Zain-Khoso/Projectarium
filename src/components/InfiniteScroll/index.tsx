'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { collection, query, where, orderBy } from 'firebase/firestore';

// Local Imports.
import { firestore } from '@/configs/firebase';
import { fetchDocs } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import CardsContainer from './Container';
import PostCard from './PostCard';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Component.
export default function InfiniteScroll() {
  const router = useRouter();
  const { toast } = useToast();

  const projectQ = query(
    collection(firestore, 'projects'),
    where('lifecycleStatus', '==', 'Published'),
    orderBy('createdAt', 'desc')
  );

  const {
    isLoading,
    isError,
    data: projects,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await fetchDocs(projectQ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    toast({
      variant: 'destructive',
      title: 'Network Problem',
      description: 'Check your internet connection.',
    });
    router.refresh();
  }

  return (
    <CardsContainer>
      {isLoading || isError ? (
        <>
          <Skeleton className={cn('w-full min-h-[500px] rounded-lg')} />
          <Skeleton className={cn('w-full min-h-[500px] rounded-lg')} />
          <Skeleton className={cn('w-full min-h-[500px] rounded-lg')} />
        </>
      ) : (
        projects?.map((project) => <PostCard key={project.id} project={project} />)
      )}
    </CardsContainer>
  );
}
