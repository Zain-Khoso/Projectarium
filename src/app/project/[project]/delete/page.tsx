// Lib Imports.
import { Metadata } from 'next';

// Local Imports.
import { fetchDoc } from '@/utils/firebase/firestore';
import DeleteButton from './DeleteButton';
import { LinkButton } from '@/components/Navigation';
import { cn } from '@/utils/utils';
import { H3, Lead, Large } from '@/components/ui/typography';

// Types.
type Props = {
  params: {
    project: string;
  };
};

// Metadata.
export const metadata: Metadata = {
  title: `Delete`,
  description:
    'Proceed with caution: Deleting a project on Projectarium is irreversible. Ensure you want to permanently remove your project from the platform.',
  keywords: [
    'delete project',
    'projectarium',
    'project removal',
    'irreversible action',
    'permanent delete',
    'programming',
    'developer projects',
  ],
}

// Component.
export default async function ProjectDelete({ params }: Props) {
  const project = await fetchDoc('projects', params.project);

  return (
    <section className={cn('w-full h-full px-4 py-8 space-y-4')}>
      <H3>Are you sure you want to delete the project &quot;{project?.title}&quot;?</H3>

      <Large>
        <Lead className={cn('text-start')}>
          Please take caution before proceeding. This action is irreversible and you will not be
          able to recover {project?.title}.
        </Lead>
      </Large>

      <div className={cn('flex items-center gap-4')}>
        <LinkButton link={`/project/${params.project}`}>No, Keep it.</LinkButton>
        <DeleteButton project={{id: params.project, ...project}} />
      </div>
    </section>
  );
}
