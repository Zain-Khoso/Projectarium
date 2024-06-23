// Lib Imports.
import { Metadata } from 'next';

// Local Imports.
import { cn } from '@/utils/utils';
import { fetchDoc } from '@/utils/firebase/firestore';
import AddContributor from './CreateForm';
import { H4, Lead } from '@/components/ui/typography';

// Types.
type Props = {
  params: {
    project: string;
  };
};

// Metadata.
export const metadata: Metadata = {
  title: 'Contributors of',
};

// Component.
export default async function ProjectContributors({ params: { project: projectId } }: Props) {
  const project = await fetchDoc('projects', projectId);

  if (!project) throw new Error('project-does-not-exist');

  return (
    <main className={cn('flex-1 w-full px-4 pt-4 md:pt-8 pb-4')}>
      <section
        className={cn('flex flex-col justify-between gap-4 md:items-center md:flex-row md:gap-2')}
      >
        <H4>
          <Lead className="inline">Contributors of </Lead>
          {project.title}
        </H4>

        <AddContributor projectId={projectId} uid={project.creator.uid} />
      </section>
    </main>
  );
}
