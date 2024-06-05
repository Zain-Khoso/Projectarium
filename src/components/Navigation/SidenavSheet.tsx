// Lib Imports.
import Link from 'next/link';
import { Menu } from 'lucide-react';

// Local Imports.
import { cn } from '@/utils/utils';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

// Tpes.
type Props = {
  children: React.ReactNode;
};

// Component.
export default function SidenavSheet({ children }: Props) {
  return (
    <Sheet>
      <SheetTrigger
        type="button"
        className={cn(
          'bg-primary text-primary-foreground hover:bg-primary2 h-9 rounded-md px-3 lg:hidden'
        )}
      >
        <Menu size={16} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn('lg:hidden w-80 h-full flex flex-col gap-4 py-8 px-4')}
      >
        <SheetHeader>
          <Link href="/">
            <SheetTitle className={cn('w-fit')}>Projectarium</SheetTitle>
          </Link>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
