// Local Imports.
import { fetchDoc } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import { H1, P, Blackquote } from '@/components/ui/typography';

// Types.
type Props = {
  params: {
    project: string;
  };
};

// Metadata.
export async function generateMetadata({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  return {
    title: project?.title,
    description: project?.discription,
    keywords: project?.tags,
  };
}

// Component.
export default async function ProjectDetailsPage({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  if (!project) throw new Error('project-does-not-exist');

  return (
    <section className={cn('w-full h-full px-4 py-8')}>
      <Blackquote className={cn('my-8')}>This page is still under development.</Blackquote>
      <H1>{project?.title}</H1>
      <P>{project?.description}</P>
    </section>
  );
}
