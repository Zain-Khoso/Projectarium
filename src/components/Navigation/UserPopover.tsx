'use client';

// Lib Imports.
import Link from 'next/link';
import { User, signOut } from 'firebase/auth';
import { User2, Settings, Bell, MessageCircle } from 'lucide-react';

// Local Imports.
import { auth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import LinkButton from './LinkButton';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
export default function UserPopover({ user }: Props) {
  const [darkmode, setDarkmode] = useDarkmode();

  return (
    <Popover>
      {/* Popover Trigger */}
      {user ? (
        <PopoverTrigger
          className={cn('w-10 h-10 rounded-full flex items-center justify-center lg:w-12 lg:h-12')}
        >
          {/* User Icon */}
          <Avatar className={cn('w-full h-full')}>
            <AvatarImage
              alt={`${user.displayName}'s Profile Picture`}
              src={user.photoURL || '/icons/user.svg'}
            />
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
      ) : (
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
      )}

      {/* Popover Content */}
      <PopoverContent align="end" className={cn('flex flex-col justify-start gap-2')}>
        {user ? (
          <>
            <Lead className={cn('w-fit')}>{user.displayName}</Lead>

            <Separator className={cn('my-2')} />

            <LinkButton link="/user" variant="ghost">
              <User2 size={16} />
              Profile
            </LinkButton>

            <LinkButton link="/chat" variant="ghost">
              <MessageCircle size={16} />
              Chat
            </LinkButton>

            <LinkButton link="/user/notification" variant="ghost">
              <Bell size={16} />
              Notifications
            </LinkButton>

            <LinkButton link="/user/settings" variant="ghost">
              <Settings size={16} />
              Settings
            </LinkButton>

            <Separator className={cn('my-2')} />
          </>
        ) : (
          <></>
        )}

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

          {/* Auth Button */}
          {user ? (
            <Button variant="destructive" type="button" onClick={() => signOut(auth)}>
              Logout
            </Button>
          ) : (
            <Link href="/register">
              <Button type="button">Login</Button>
            </Link>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
