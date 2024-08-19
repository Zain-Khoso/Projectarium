// Components.
import Heading from '@/components/Heading';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
};

// Component.
export default function FavoritesTab({ currentUser }: Props) {
  return (
    <section className="flex-1 h-full flex flex-col gap-4">
      <Heading title={`Your Favorites`} subtitle={`Your favorite projects.`} />

      <div className="h-full grid place-items-center">
        <span className="font-semibold text-lg">You don&apos;t have any favorite projects.</span>
      </div>
    </section>
  );
}
