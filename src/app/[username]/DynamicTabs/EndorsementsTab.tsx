// Components.
import Heading from '@/components/Heading';

// Types.
import { User } from '@prisma/client';
type Props = {
  profileUser: User | null;
};

// Component.
export default function EndorsementsTab({ profileUser }: Props) {
  return (
    <section className="flex-1 h-full flex flex-col gap-4">
      <Heading
        title={`${profileUser?.name || profileUser?.username}'s Endorsements`}
        subtitle={`Recognitions from peers and collaborators`}
      />

      <div className="h-full grid place-items-center">
        <span className="font-semibold text-lg">
          {profileUser?.name || profileUser?.username} has not been endorsed by anyone yet.
        </span>
      </div>
    </section>
  );
}
