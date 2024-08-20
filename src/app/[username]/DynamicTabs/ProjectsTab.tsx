// Components.
import Heading from '@/components/Heading';

// Types.
import { User } from '@prisma/client';
type Props = {
  profileUser: User | null;
};

// Component.
export default function ProjectsTab({ profileUser }: Props) {
  return (
    <section className="flex-1 h-full flex flex-col gap-4">
      <Heading
        title={`${profileUser?.name || profileUser?.username}'s Projects`}
        subtitle={`A complete showcase of ${profileUser?.name || profileUser?.username}'s work`}
      />

      <div className="h-full grid place-items-center">
        <span className="font-semibold text-lg">
          {profileUser?.name || profileUser?.username} has not created any projects yet.
        </span>
      </div>
    </section>
  );
}
