// Lib Imports.
import Link from 'next/link';
import { Notebook, Users, Award, Trash } from 'lucide-react';

// Local Imports.
import { cn } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';

// Types.
type Props = {
  children: React.ReactNode;
  params: {
    project: string;
  };
};

// Component.
export default function ProjectSectionLayout({ children, params: { project } }: Props) {
  return (
    <main className={cn('w-full max-w-screen-xl h-dvh flex items-start overflow-hidden mx-auto')}>
      <header className={cn('w-80 h-full flex flex-col gap-4 py-8 px-4')}>
        <Link href="/">
          <H3 className={cn('py-2')}>Projectarium</H3>
        </Link>

        <Separator />

        <Link href={`/project/${project}`}>
          <Button
            type="button"
            variant="outline"
            className={cn('w-full flex items-center justify-start gap-2')}
          >
            <Notebook size={16} />
            Detail
          </Button>
        </Link>
        <Link href={`/project/${project}/contributors`}>
          <Button
            type="button"
            variant="outline"
            className={cn('w-full flex items-center justify-start gap-2')}
          >
            <Users size={16} /> Contributors
          </Button>
        </Link>
        <Link href={`/project/${project}/reviews`}>
          <Button
            type="button"
            variant="outline"
            className={cn('w-full flex items-center justify-start gap-2')}
          >
            <Award size={16} />
            Reviews
          </Button>
        </Link>
        <Link href={`/project/${project}/delete`}>
          <Button
            type="button"
            variant="outline"
            className={cn('w-full flex items-center justify-start gap-2')}
          >
            <Trash size={16} /> Delete
          </Button>
        </Link>
      </header>

      <main className={cn('flex-1 h-full')}>
        <Navbar />

        {children}
      </main>
    </main>
  );
}
