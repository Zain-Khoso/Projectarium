// Lib Imports.
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import { Button } from '../ui/button';

// Types.
interface PropsT extends Props {
  link?: string;
  variant?: 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary';
  className?: string;
}

// Component.
export default function LinkButton({ link, variant, className, children }: PropsT) {
  return (
    <Link href={link || ''}>
      <Button
        type="button"
        variant={variant || 'default'}
        className={cn('w-full flex justify-start items-center gap-2', className)}
      >
        {children}
      </Button>
    </Link>
  );
}
