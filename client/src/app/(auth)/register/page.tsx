// Lib Imports.
import { Metadata } from 'next';

// Local Imports.
import { cn } from '@/utils/utils';
import { H1 } from '@/components/ui/typography';
import Options from './Options';

// Metadata.
export const metadata: Metadata = {
  title: 'Register - Projectarium: Share, Innovate, Connect',
  description:
    'Join Projectarium to showcase your latest projects, receive feedback, and connect with like-minded programmers. Use your social accounts like Google, GitHub, Twitter, or Facebook to get started and become part of our supportive and interactive programming community.',
  keywords: [
    'register',
    'login',
    'projectarium',
    'programming',
    'project sharing',
    'collaboration',
    'innovation',
    'developer community',
    'social login',
  ],
};

// Component.
export default function Register() {
  return (
    <main className={cn('w-dvw h-dvh grid place-items-center')}>
      <section className={cn('w-dvw h-dvh')}>
        <div
          className={cn('w-dvw h-dvh flex flex-col justify-center items-center gap-8 px-2 py-4')}
        >
          <H1>Register</H1>

          <Options />
        </div>
      </section>
    </main>
  );
}
