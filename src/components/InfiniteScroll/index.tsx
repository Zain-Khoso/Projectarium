'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// Local Imports.
import { fetchPublishedProjects } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import CardsContainer from './Container';
import PostCard from './PostCard';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Component.
export default function InfiniteScroll() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    isLoading,
    isError,
    data: projects,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await fetchPublishedProjects(),
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
