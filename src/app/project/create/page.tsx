// Lib Import.
import { Metadata } from 'next';

// Local Imports.
import { cn } from '@/utils/utils';
import Navbar from '@/components/Navbar';

// Metadata.
export const metadata: Metadata = {
  title: 'Create a New Project - Projectarium: Share, Innovate, Connect',
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
export default function CreateProject() {
  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <Navbar />
    </main>
  );
}
