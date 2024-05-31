'use client';

// Lib Imports.
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// Hooks
import useDarkmode from '@/hooks/useDarkmode';

// Component.
export default function UnAuthenticatedUI() {
  const [darkmode, setDarkmode] = useDarkmode();

  return (
    <Popover>
      {/* Popover Trigger */}
      <PopoverTrigger
        className={cn(
          'w-10 h-10 bg-primary rounded-full p-2 flex items-center justify-center lg:w-12 lg:h-12'
        )}
      >
        <Avatar className={cn('w-full h-full')}>
          <AvatarImage alt="Anonymous User Icon" src="/icons/user.svg" />
          <AvatarFallback>
            <Skeleton />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent align="end" className={cn('flex items-center justify-between')}>
        {/* Login Button */}
        <Link href="/register">
          <Button type="button">Login</Button>
        </Link>

        {/* Darkmode Toggle */}
        <div className={cn('flex justify-center items-center gap-2')}>
          {/* Darkmode Label */}
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>

          {/* Darkmode Switch */}
          <Switch
            id="dark-mode-toggle"
            checked={darkmode}
            onCheckedChange={() => setDarkmode(!darkmode)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
