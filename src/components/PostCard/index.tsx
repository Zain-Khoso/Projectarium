// Lib Imports.
import Image from 'next/image';
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import { LinkButton } from '@/components/Navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Small, Muted } from '@/components/ui/typography';

// Types.
type Props = {
  project: Record<string, any>;
};

// Component.
export default function PostCard({ project }: Props) {
  // Shortening project description.
  const description =
    project.description.length <= 300
      ? project.description
      : project.description.substring(0, project.description.substring(0, 301).lastIndexOf(' ')) +
        '...';

  return (
    <Card
      className={cn(
        'w-full h-full flex flex-col justify-between shadow-[0_0_0.5rem] shadow-foreground/25 border-none transition-all hover:shadow-[0_0.3rem_0.5rem] hover:shadow-foreground/15 hover:-translate-y-1'
      )}
    >
      {/* Header */}
      <CardHeader className={cn('space-y-4 p-0 mb-4')}>
        {/* Thumbnail */}
        <Image
          width={1280}
          height={720}
          alt={`${project.title}'s Thumbnail`}
          src={project.images.at(-1)}
          className={cn('w-full rounded-t-lg aspect-video object-cover object-center')}
        />

        {/* Header Text Content */}
        <div className={cn('px-6 space-y-4')}>
          <CardTitle className={cn('flex justify-between items-center')}>
            {project.title}
            <Badge variant={project.status === 'Completed' ? 'default' : 'outline'}>
              {project.status}
            </Badge>
          </CardTitle>

          <Separator />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className={cn('space-y-4 flex-1')}>
        {/* Description */}
        <CardDescription>{description}</CardDescription>

        {/* Category Badges */}
        <div className={cn('flex flex-wrap gap-2')}>
          {project.tags.map((item: string) => (
            <Badge key={`Tag: ${item}`} variant={'secondary'}>
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className={cn('flex flex-col gap-4')}>
        <Separator />

        <div className={cn('w-full flex justify-between')}>
          {/* Author */}
          <Link href={`/user/${project.creator.uid}`} className={cn('flex items-center gap-2')}>
            <Avatar>
              <AvatarImage alt={`${project.creator.name}'s Avatar`} src={project.creator.picture} />
              <AvatarFallback>
                <Skeleton />
              </AvatarFallback>
            </Avatar>

            <Small>
              <Muted>{project.creator.name}</Muted>
            </Small>
          </Link>

          {/* Details Button */}
          <LinkButton link={`/project/${project.id}`}>View Details</LinkButton>
        </div>
      </CardFooter>
    </Card>
  );
}
