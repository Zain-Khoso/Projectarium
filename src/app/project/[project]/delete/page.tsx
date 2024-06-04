// Local Imports.
import { fetchDoc } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import { H3, Lead } from '@/components/ui/typography';
import DeleteButton from './DeleteButton';

// Types.
type Props = {
  params: {
    project: string;
  };
};

// Component.
export default async function ProjectDelete({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  return (
    <section className={cn('w-full h-full px-4 py-8 space-y-4')}>
      <H3>Are you sure, you want to delete {project?.title}?</H3>
      <Lead className={cn('text-start')}>
        Please take caution before continuing. You will not be able to recover this post EVER again.
      </Lead>

      <DeleteButton projectId={params.project} />
    </section>
  );
}
