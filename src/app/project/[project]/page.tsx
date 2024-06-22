// Lib Imports.
import Image from 'next/image';
import Link from 'next/link';

// Local Imports.
import { fetchDoc } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import { LinkButton } from '@/components/Navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { H1, P, Small, Muted } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Update from './Update';

// Types.
type Props = {
  params: {
    project: string;
  };
};

// Metadata.
export async function generateMetadata({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  return {
    title: project?.title,
    description: project?.discription,
    keywords: project?.tags,
  };
}

// Component.
export default async function ProjectDetailsPage({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  if (!project) throw new Error('project-does-not-exist');

  const createdAt = new Date(project.createdAt?.seconds);

  return (
    <ScrollArea className={cn('flex-1 w-full px-4 pt-4 md:pt-8 pb-4')}>
      <section className={cn('flex flex-col gap-4')}>
        {/* Title and Status */}
        <div className={cn('flex items-start gap-2 mb-6')}>
          {/* Project Title */}
          <H1>{project.title}</H1>

          {/* Project Development Status */}
          <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
            {project.status}
          </Badge>
        </div>

        {/* Image Carousel */}
        <Carousel className="w-full md:w-3/5 md:ml-12">
          <CarouselContent>
            {project.images?.toReversed()?.map((url: string, index: number) => (
              <CarouselItem key={url}>
                <Image
                  alt={`${project.title}'s ${index + 1} image.`}
                  src={url}
                  width={500}
                  height={300}
                  className={cn('w-full aspect-video object-cover object-center')}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={cn('hidden md:flex')} />
          <CarouselNext className={cn('hidden md:flex')} />
        </Carousel>

        {/* Creator */}
        <Link
          href={`/user/${project.creator.uid}`}
          className={cn('w-full flex items-center justify-start gap-2')}
        >
          <Image
            src={project.creator.picture}
            alt={`Photo of ${project.title}'s creator, ${project.title.name}`}
            width={50}
            height={50}
            className={cn('rounded-full')}
          />

          <div className={cn('flex flex-col gap-1')}>
            <Small>{project.creator.name}</Small>
            <Muted>Created At: {createdAt.toDateString().slice(4)}</Muted>
          </div>
        </Link>

        {/* Description */}
        <P>{project.description}</P>

        {/* Actions */}
        <div className={cn('w-full h-full flex flex-wrap justify-end gap-2 mt-8')}>
          {project.repository && (
            <LinkButton link={project.repository} variant="secondary">
              Repository
            </LinkButton>
          )}

          {project.url && (
            <LinkButton link={project.url} variant="secondary">
              Visit
            </LinkButton>
          )}

          <Update creatorId={project.creator.uid} />
        </div>
      </section>
    </ScrollArea>
  );
}
