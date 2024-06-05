// Lib Imports.
import { Notebook, Users, Award, Trash } from 'lucide-react';

// Local Imports.
import { cn } from '@/utils/utils';
import { Navbar, Sidenav, LinkButton } from '@/components/Navigation';

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
        <LinkButton variant="outline" link={`/project/${project}`}>
          <Notebook size={16} /> Detail
        </LinkButton>

        <LinkButton variant="outline" link={`/project/${project}/contributors`}>
          <Users size={16} /> Contributors
        </LinkButton>

        <LinkButton variant="outline" link={`/project/${project}/reviews`}>
          <Award size={16} /> Reviews
        </LinkButton>

        <LinkButton variant="outline" link={`/project/${project}/delete`}>
          <Trash size={16} /> Delete
        </LinkButton>
      </Sidenav>

      <main className={cn('flex-1 h-full')}>
        <Navbar />

        {children}
      </main>
    </main>
  );
}
