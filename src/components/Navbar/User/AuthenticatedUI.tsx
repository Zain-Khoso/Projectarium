'use client';

// Lib Imports.
import Image from 'next/image';
import Link from 'next/link';
import { User, signOut } from 'firebase/auth';
import { User2, Settings, PlusSquare } from 'lucide-react';

// Local Imports.
import { auth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Lead } from '@/components/ui/typography';

// Hooks.
import useDarkmode from '@/hooks/useDarkmode';

// Types.
type Props = {
  user: User;
};

// Component.
export default function AuthenticatedUI({ user }: Props) {
  const [darkmode, setDarkmode] = useDarkmode();

  return (
    <Popover>
      {/* Popover Trigger */}
      <PopoverTrigger
        className={cn('w-12 h-12 rounded-full flex items-center justify-center overflow-hidden')}
      >
        {/* User Icon */}
        <Image
          width={32}
          height={32}
          alt={`${user.displayName}'s Profile Picture`}
          src={user.photoURL || '/icons/user.svg'}
          className={cn('w-full aspect-square')}
        />
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent align="end" className={cn('flex flex-col justify-start gap-2')}>
        <Lead className={cn('w-fit')}>{user.displayName}</Lead>

        <Separator className={cn('my-2')} />

        <Link href={`/${user.uid}`}>
          <Button
            variant="ghost"
            type="button"
            className={cn('flex items-center justify-center gap-2 px-1 hover:text-foreground')}
          >
            <User2 size={16} />
            Profile
          </Button>
        </Link>

        <Link href={`/${user.uid}/create`}>
          <Button
            variant="ghost"
            type="button"
            className={cn('flex items-center justify-center gap-2 px-1 hover:text-foreground')}
          >
            <PlusSquare size={16} />
            Create New Post
          </Button>
        </Link>

        <Link href="/settings">
          <Button
            variant="ghost"
            type="button"
            className={cn('flex items-center justify-center gap-2 px-1 hover:text-foreground')}
          >
            <Settings size={16} />
            Settings
          </Button>
        </Link>

        <Separator className={cn('my-2')} />

        <div className={cn('flex items-center justify-between')}>
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

          {/* Logout Button */}
          <Button variant="destructive" type="button" onClick={() => signOut(auth)}>
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
