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
export async function generateMetadata({ params }: PropsT) {
  const project = await fetchDoc('projects', params.project);

  return {
    title: {
      template: `%s ${project?.title} | Projectarium`,
    },
    description: project?.description,
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

      <main className={cn('flex-1 h-full')}>
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
