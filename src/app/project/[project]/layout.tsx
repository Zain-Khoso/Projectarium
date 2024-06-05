// Local Imports.
import { cn } from '@/utils/utils';
import { Navbar, Sidenav, SidenavSheet } from '@/components/Navigation';
import SidenavRoutes from './SidenavRoutes';

// Types.
type Props = {
  children: React.ReactNode;
  params: {
    project: string;
  };
};

// Component.
export default function ProjectSectionLayout({ children, params: { project } }: Props) {
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
