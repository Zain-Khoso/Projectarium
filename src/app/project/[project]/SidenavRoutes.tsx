// Lib Imports.
import { Home, Award, Notebook, Users } from 'lucide-react';

// Local Imports
import DeleleRouteButton from './DeleleRouteButton';
import { LinkButton } from '@/components/Navigation';

// Component.
export default function SidenavRoutes({ project }: { project: string }) {
  return (
    <>
      <LinkButton variant="outline" link={`/`}>
        <Home size={16} /> Home
      </LinkButton>

      <LinkButton variant="outline" link={`/project/${project}`}>
        <Notebook size={16} /> Detail
      </LinkButton>

      <LinkButton variant="outline" link={`/project/${project}/contributors`}>
        <Users size={16} /> Contributors
      </LinkButton>

      <LinkButton variant="outline" link={`/project/${project}/reviews`}>
        <Award size={16} /> Reviews
      </LinkButton>

      <DeleleRouteButton projectId={project} />
    </>
  );
}
