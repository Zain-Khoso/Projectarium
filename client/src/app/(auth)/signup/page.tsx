// Lib Imports.
import { Metadata } from 'next';
import Link from 'next/link';

// Local Imports.
import { cn } from '@/utils/utils';
import { H3, Small, Muted } from '@/components/ui/typography';

// Metadata.
export const metadata: Metadata = {
  title: 'Sign Up - Projectarium: Share, Innovate, Connect',
  description:
    'Create an account on Projectarium to showcase your latest projects, receive feedback, and connect with like-minded programmers. Join our supportive and interactive programming community today.',
  keywords: [
    'sign up',
    'projectarium',
    'programming',
    'project sharing',
    'collaboration',
    'innovation',
    'developer community',
  ],
};

// Component.
export default function Register() {
  return (
    <main className={cn('w-dvw h-dvh flex justify-center items-center')}>
      <section
        className={cn(
          'w-full h-fit min-h-[300px] flex flex-col justify-between items-center p-2 shadow-[0_0_1rem_rgba(0,0,0,0.2)] md:flex-row md:justify-center md:gap-8'
        )}
      >
        <header className={cn('flex flex-col justify-between items-center')}>
          <H3 className={cn('text-theme md:text-4xl')}>Sign Up</H3>
          <Muted>
            <Small>Join Projectarium and Share Your Creations.</Small>
          </Muted>
        </header>

        <main className={cn('flex flex-col justify-between items-center')}>
          <Muted>
            Have an account already?{' '}
            <Link href="/login" className={cn('text-teal-800 font-semibold')}>
              Log In
            </Link>
            .
          </Muted>
        </main>
      </section>
    </main>
  );
}
