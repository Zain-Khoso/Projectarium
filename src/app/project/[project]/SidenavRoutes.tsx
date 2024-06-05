import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import { Link, Notebook } from 'lucide-react';

export default function SidenavRoutes({ project }: { project: string }) {
  return (
    <>
      <Link href={`/project/${project}`}>
        <Button type="button" variant="outline" className={cn('w-full flex items-center gap-2')}>
          <Notebook size={16} />
          Detail
        </Button>
      </Link>

      <Link href={`/project/${project}/contributors`}>
        <Button type="button" variant="outline" className={cn('w-full flex items-center gap-2')}>
          <Notebook size={16} />
          Contributors
        </Button>
      </Link>

      <Link href={`/project/${project}/reviews`}>
        <Button type="button" variant="outline" className={cn('w-full flex items-center gap-2')}>
          <Notebook size={16} />
          Reviews
        </Button>
      </Link>

      <Link href={`/project/${project}/delete`}>
        <Button type="button" variant="outline" className={cn('w-full flex items-center gap-2')}>
          <Notebook size={16} />
          Delete
        </Button>
      </Link>
    </>
  );
}
