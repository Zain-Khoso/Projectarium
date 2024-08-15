'use client';

// Lib Imports.
import { signIn } from 'next-auth/react';
import router from 'next/router';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

// Icons.
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

// Components.
import { Button } from '@/components/Button';

// Component.
export default function SocialLogins() {
  const login = useCallback((provider: 'google' | 'github') => {
    signIn(provider).then((callback) => {
      if (callback?.ok) {
        toast.success('Logged in');
        router.push('/');
      }

      if (callback?.error) toast.error(callback.error);
    });
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
