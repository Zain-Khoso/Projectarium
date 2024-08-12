'use client';

// Icons.
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

// Components.
import { Button } from '@/components/Button';

// Component.
export default function SocialLogins() {
  return (
    <div className="w-full flex flex-col gap-2">
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} />
    </div>
  );
}
