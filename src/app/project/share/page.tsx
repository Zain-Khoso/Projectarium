// Lib Import.
import { Metadata } from 'next';

// Local Imports.
import { cn } from '@/utils/utils';
import ShareProjectForm from './Form';
import { H1 } from '@/components/ui/typography';

// Metadata.
export const metadata: Metadata = {
  title: 'Share Your Project - Inspire and Collaborate',
  description:
    'Share your latest project on Projectarium. Fill in the details to showcase your work, receive feedback, and connect with like-minded programmers. Join our supportive and interactive programming community today.',
  keywords: [
    "share project",
    "projectarium",
    "programming projects",
    "developer collaboration",
    "project showcase",
    "inspire",
    "feedback",
    "developer community"
  ],
};

// Component.
export default function ShareProject() {
  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <section className={cn('max-w-screen-xl mx-auto px-4 py-8 space-y-12')}>
        <H1>Share Your New Project.</H1>

        <ShareProjectForm />
      </section>
    </main>
  );
}
