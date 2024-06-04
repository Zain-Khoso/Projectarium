// Local Imports.
import { fetchDoc } from '@/utils/firebase/firestore';

// Local Imports.
import { cn } from '@/utils/utils';
import { H1, P, Blackquote } from '@/components/ui/typography';

// Types.
type Props = {
  params: {
    project: string;
  };
};

// Component.
export default async function ProjectDetailsPage({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  return (
    <section className={cn('w-full h-full px-4 py-8')}>
      <Blackquote className={cn('my-8')}>This page is still under development.</Blackquote>
      <H1>{project?.title}</H1>
      <P>{project?.description}</P>
    </section>
  );
}
