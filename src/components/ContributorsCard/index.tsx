'use client';

// Lib Imports.
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DeleteButton from './DeleteButton';

// Types.
type Props = {
  projectId: string;
  contributor: Dictionary;
  uid: string;
};

// Component.
export default function ContributorCard({ projectId, contributor, uid }: Props) {
  return (
    <Card className={cn('w-full')}>
      <CardHeader className={cn('w-full flex flex-row items-center justify-between gap-2')}>
        <Link
          href={`/user/${contributor.id}`}
          target="_blank"
          className={cn('flex items-center gap-4')}
        >
          <Avatar>
            <AvatarImage alt={`${contributor.name}'s picture`} src={contributor.picture} />

            <AvatarFallback>
              <Skeleton className={cn('w-full h-full rounded-full')} />
            </AvatarFallback>
          </Avatar>

          <CardTitle>{contributor.name}</CardTitle>
        </Link>
        <DeleteButton projectId={projectId} contributorId={contributor.id} uid={uid} />
      </CardHeader>

      <CardContent>
        <CardDescription className={cn('flex-1')}>{contributor.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
