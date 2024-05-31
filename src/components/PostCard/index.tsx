'use client';

// Lib Imports.
import Image from 'next/image';
import Link from 'next/link';

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
import { Button } from '@/components/ui/button';
import { Small, Muted } from '@/components/ui/typography';

// Component.
export default function PostCard() {
  return (
    <Card className={cn('w-full')}>
      <CardHeader className={cn('space-y-4')}>
        <Image
          width={1280}
          height={720}
          alt="Post Thumbnail"
          src="https://firebasestorage.googleapis.com/v0/b/the-projectarium.appspot.com/o/skilllink.png?alt=media&token=a095f3d2-0089-4c8c-975f-a18a38b8f144"
          className={cn('w-full rounded-lg')}
        />
        <CardTitle className={cn('flex justify-between items-center')}>
          Skill Link <Badge variant="default">Complete</Badge>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className={cn('space-y-4')}>
        <CardDescription>
          The ultimate job board connecting top talent with amazing opportunities. Our platform
          leverages cutting-edge technology and vast industry connections to match job seekers with
          their dream career and help companies find the perfect fit. Unlock your full potential
          today with SkillLink.
        </CardDescription>
        <div className={cn('flex flex-wrap gap-2')}>
          <Badge variant={'secondary'}>Web Development</Badge>
          <Badge variant={'secondary'}>Frontend</Badge>
          <Badge variant={'secondary'}>Backend</Badge>
          <Badge variant={'secondary'}>Nextjs</Badge>
          <Badge variant={'secondary'}>MongoDB</Badge>
          <Badge variant={'secondary'}>Job Board App</Badge>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className={cn('flex justify-between')}>
        <div className={cn('flex items-center gap-2')}>
          <Avatar>
            <AvatarImage
              alt="Creator Profile Picture"
              src="https://avatars.githubusercontent.com/u/108749606?v=4"
            />
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>

          <Small>
            <Muted>Muhammad Imtiaz Hussain</Muted>
          </Small>
        </div>
        <Link href="/useridentification/projectidentification">
          <Button size={'sm'}>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
