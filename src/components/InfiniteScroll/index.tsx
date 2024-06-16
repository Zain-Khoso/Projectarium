'use client';

// Lib Imports.
import { useEffect, useContext } from 'react';

// Local Imports.
import { ScrollContext } from './context';
import Container from './Container';
import SkeletonUI from './SkeletonUI';
import PostCard from './PostCard';
import { useToast } from '../ui/use-toast';

// Component.
export default function InfiniteScroll() {
  const { toast } = useToast();

  const [{ isLoading, isError, projects }] = useContext(ScrollContext);

  useEffect(() => {
    if (isError)
      toast({
        variant: 'destructive',
        title: 'Network Problem',
        description: 'Check your internet connection, and try again.',
      });
  }, [isError]);

  return (
    <Container>
      {projects.map((project) => (
        <PostCard key={project.id} project={project} />
      ))}

      {isLoading && <SkeletonUI />}
    </Container>
  );
}
