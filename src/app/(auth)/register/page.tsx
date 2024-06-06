// Lib Imports.
import { Metadata } from 'next';
import Image from 'next/image';

// Local Imports.
import { cn } from '@/utils/utils';
import { H1 } from '@/components/ui/typography';
import Options from './Options';

// Metadata.
export const metadata: Metadata = {
  title: 'Register to Share and Innovate',
  description:
    'Create an account on Projectarium to showcase your latest projects, receive feedback, and connect with like-minded programmers. Join our supportive and interactive programming community today.',
  keywords: [
    'register',
    'login',
    'projectarium',
    'projectarium',
    'programming',
    'project sharing',
    'developer collaboration',
    'innovation',
    'developer community',
    'social login',
  ],
};

// Component.
export default function Register() {
  return (
    <main className={cn('w-dvw h-dvh grid place-items-center')}>
      <section
        className={cn(
          'w-dvw h-dvh max-w-screen-sm lg:max-w-screen-md lg:max-h-[470px] lg:flex justify-center lg:rounded-xl lg:shadow-[0_0_0.1rem] shadow-foreground/5 overflow-hidden'
        )}
      >
        <div
          className={cn(
            'hidden w-[50%] lg:grid bg-gradient-to-br from-primary to-primary2 place-items-center flex-1'
          )}
        >
          <Image
            width={280}
            height={400}
            alt="User Register Illustration"
            src="/illustrations/register.svg"
          />
        </div>

        <div
          className={cn(
            'w-dvw h-dvh max-w-screen-sm flex flex-col justify-center items-center gap-8 px-2 py-4 bg-background lg:max-w-[350px] lg:max-h-full'
          )}
        >
          <H1>Register</H1>

          <Options />
        </div>
      </section>
    </main>
  );
}
