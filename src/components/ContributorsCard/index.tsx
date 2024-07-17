'use client';

// Lib Imports.
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import { Skeleton } from '@/components/ui/skeleton';
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
    <div
      className={cn(
        'w-full flex items-center justify-between px-4 py-2 border border-foreground/20 rounded-md'
      )}
    >
      <Link
        href={`/user/${contributor.id}`}
        target="_blank"
        className={cn('flex items-center gap-2 text-lg')}
      >
        <Avatar>
          <AvatarImage alt={`${contributor.name}'s picture`} src={contributor.picture} />
          <AvatarFallback>
            <Skeleton className={cn('w-full h-full rounded-full')} />
          </AvatarFallback>
        </Avatar>

        {contributor.name}
      </Link>

      <DeleteButton projectId={projectId} contributorId={contributor.id} uid={uid} />
    </div>
  );
}
