'use client';

// Lib Imports.
import Image from 'next/image';
import Link from 'next/link';
import { useState, useLayoutEffect } from 'react';

// Local Imports.
import { cn } from '@/utils/utils';
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
import { Small, Muted } from '@/components/ui/typography';

// Types.
type Props = {
  contributor: Dictionary;
};

// Component.
export default function ContributorCard({ contributor }: Props) {
  return (
    <Link href={`/user/${contributor.id}`} target="_blank" className={cn('w-full ')}>
      <div
        className={cn(
          'w-full flex items-center gap-2 text-lg px-4 py-2 border border-foreground/20 rounded-md'
        )}
      >
        <Avatar>
          <AvatarImage alt={`${contributor.name}'s picture`} src={contributor.picture} />
          <AvatarFallback>
            <Skeleton className={cn('w-full h-full rounded-full')} />
          </AvatarFallback>
        </Avatar>

        {contributor.name}
      </div>
    </Link>
  );
}
