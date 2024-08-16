'use client';

// Lib Imports.
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

// Icons.
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

// Components.
import { Button } from '@/components/Button';

// Component.
export default function SocialLogins() {
  const login = useCallback(async (provider: 'google' | 'github') => {
    try {
      await signIn(provider, { callbackUrl: '/' });
      toast.success('Logged in.');
    } catch {
      toast.error('Something went wrong.');
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => login('github')}
      />
    </div>
  );
}
