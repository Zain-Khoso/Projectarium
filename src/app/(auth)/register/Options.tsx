'use client';

// Lib Imports.
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// Local Imports.
import { auth, GoogleAuth, GithubAuth } from '@/configs/firebase';
import { cn } from '@/utils/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Component.
export default function Options() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, isAuthLoading, error] = useAuthState(auth);

  const registerWith = async function (provider: string) {
    setIsLoading(true);

    switch (provider) {
      case 'google':
        await signInWithPopup(auth, GoogleAuth);
        break;

      case 'github':
        await signInWithPopup(auth, GithubAuth);
        break;

      case 'facebook':
        toast({
          variant: 'destructive',
          title: 'Not Available',
          description:
            'Facebook Registeration is not available at the moment, Please use another one.',
        });
        break;

      case 'twitter':
        toast({
          variant: 'destructive',
          title: 'Not Available',
          description:
            'Twitter Registeration is not available at the moment, Please use another one.',
        });
        break;

      default:
        break;
    }

    setIsLoading(false);
  };

  if (isAuthLoading || isLoading)
    return (
      <div className={cn('w-full flex flex-col gap-2 lg:max-w-[300px]')}>
        <Skeleton className={cn('w-full h-10 rounded-lg')} />
        <Skeleton className={cn('w-full h-10 rounded-lg')} />
        <Skeleton className={cn('w-full h-10 rounded-lg')} />
        <Skeleton className={cn('w-full h-10 rounded-lg')} />
      </div>
    );

  if (error) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'We are having some problem on our side, Please try again later.',
    });
    router.push('/');
  }

  if (user) router.push('/');

  return (
    <div className={cn('w-full flex flex-col gap-2 md:max-w-screen-sm lg:max-w-[300px]')}>
      <Button
        variant="outline"
        className={cn('flex items-center justify-center gap-2')}
        onClick={() => registerWith('google')}
      >
        <Image width={24} height={24} alt="Google Icon" src="/icons/social-media/google.svg" />
        Continue With Google
      </Button>
      <Button
        variant="outline"
        className={cn('flex items-center justify-center gap-2')}
        onClick={() => registerWith('github')}
      >
        <Image width={24} height={24} alt="GitHub Icon" src="/icons/social-media/github.svg" />
        Continue With GitHub
      </Button>
      <Button
        variant="outline"
        className={cn('flex items-center justify-center gap-2')}
        onClick={() => registerWith('facebook')}
      >
        <Image width={24} height={24} alt="Facebook Icon" src="/icons/social-media/facebook.svg" />
        Continue With Facebook
      </Button>
      <Button
        variant="outline"
        className={cn('flex items-center justify-center gap-2')}
        onClick={() => registerWith('twitter')}
      >
        <Image width={24} height={24} alt="X Icon" src="/icons/social-media/twitter.svg" />
        Continue With Twitter
      </Button>
    </div>
  );
}
