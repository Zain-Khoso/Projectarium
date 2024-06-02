// Lib Import.
import { Metadata } from 'next';

// Local Imports.
import { cn } from '@/utils/utils';
import Navbar from '@/components/Navbar';
import ShareProjectForm from './Form';
import { H2, Muted } from '@/components/ui/typography';

// Metadata.
export const metadata: Metadata = {
  title: 'Share a New Project - Projectarium: Share, Innovate, Connect',
  description:
    'Share your latest project on Projectarium. Fill in the details to showcase your work, receive feedback, and connect with like-minded programmers. Join our supportive and interactive programming community today.',
  keywords: [
    'create project',
    'new project',
    'projectarium',
    'programming',
    'project sharing',
    'collaboration',
    'innovation',
    'developer community',
  ],
};

// Component.
export default function ShareProject() {
  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <Navbar />

      <section className={cn('max-w-screen-xl mx-auto px-4 py-8 space-y-8')}>
        <H2>Share Your New Project.</H2>

        <ShareProjectForm />
      </section>
    </main>
  );
}
