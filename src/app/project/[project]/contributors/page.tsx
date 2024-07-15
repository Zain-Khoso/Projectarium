// Lib Imports.
import { Metadata } from 'next';

// Local Imports.
import { cn } from '@/utils/utils';
import { fetchDoc, fetchDocs } from '@/utils/firebase/firestore';
import AddContributor from './CreateForm';
import ContributorCard from '@/components/ContributorCard';
import { H4, Lead } from '@/components/ui/typography';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '@/configs/firebase';

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
  const contributors = await fetchDocs(
    query(
      collection(firestore, 'projects', projectId, 'contributors'),
      // where('status', '==', 'Approved'),
      orderBy('name', 'desc')
    )
  );

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

      <section
        className={cn(
          'grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-start gap-8 px-2 py-8 mx-auto'
        )}
      >
        {contributors.length ? (
          contributors.map((contributor) => (
            <ContributorCard key={contributor.id} contributor={contributor} />
          ))
        ) : (
          <Lead>No contributors.</Lead>
        )}
      </section>
    </main>
  );
}
