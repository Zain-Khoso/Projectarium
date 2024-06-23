// Lib Imports.
import { Metadata } from 'next';

// Local Imports.
import { fetchDoc } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import { Navbar, Sidenav, SidenavSheet } from '@/components/Navigation';
import SidenavRoutes from './SidenavRoutes';

// Types.
interface PropsT extends Props {
  params: {
    project: string;
  };
}

// Metadata.
export async function generateMetadata({ params }: PropsT): Promise<Metadata> {
  const project = await fetchDoc('projects', params.project);

  return {
    title: {
      template: `%s ${project?.title} | Projectarium`,
      default: project?.title,
    },
    description:
      project?.description?.substring(0, project?.description?.substring(0, 150).lastIndexOf(' ')) +
      '...',
    keywords: project?.tags,
    authors: [
      {
        name: project?.creator?.name,
        url: `/users/${project?.creator?.uid}`,
      },
    ],
  };
}

// Component.
export default function ProjectSectionLayout({ children, params: { project } }: PropsT) {
  return (
    <main className={cn('w-full max-w-screen-xl h-dvh flex items-start overflow-hidden mx-auto')}>
      {/* Sidenav for larger displays */}
      <Sidenav>
        <SidenavRoutes project={project} />
      </Sidenav>

      <main className={cn('flex-1 flex flex-col h-full')}>
        <Navbar>
          <SidenavSheet>
            <SidenavRoutes project={project} />
          </SidenavSheet>
        </Navbar>

        {children}
      </main>
    </main>
  );
}
