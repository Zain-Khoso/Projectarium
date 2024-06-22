// Lib Imports.
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import { Button } from '../ui/button';

// Types.
interface PropsT extends Props {
  link?: string;
  variant?: 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary';
  target?: '_blank' | '_parent' | '_self' | '_top';
  className?: string;
}

// Component.
export default function LinkButton({ link, variant, target, className, children }: PropsT) {
  return (
    <Link href={link || ''} target={target || '_self'}>
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
