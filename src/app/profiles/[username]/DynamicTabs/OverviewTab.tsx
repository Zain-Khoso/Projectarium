// Components.
import FeatureSection from './FeatureSection';

// Types.
import { User } from '@prisma/client';
type Props = {
  profileUser: User | null;
};

// Component.
export default function DynamicTabSection({ profileUser }: Props) {
  return (
    <section className="flex-1 h-full flex flex-col gap-4">
      {/* Featured Endorsements */}
      <FeatureSection
        title="Featured Endorsements"
        subtitle={`Highlighted Creations Handpicked by ${profileUser?.name || profileUser?.username}`}
      >
        <div className="h-full grid place-items-center">
          <span className="font-semibold text-lg">No featured endorsements.</span>
        </div>
      </FeatureSection>

      {/* Featured Projects */}
      <FeatureSection
        title="Featured Projects"
        subtitle={`Highlighted Creations Handpicked by ${profileUser?.name || profileUser?.username}`}
      >
        <div className="h-full grid place-items-center">
          <span className="font-semibold text-lg">No featured projects.</span>
        </div>
      </FeatureSection>

      {/* Featured Contributions */}
      <FeatureSection
        title="Featured Contributions"
        subtitle={`Highlighted Creations Handpicked by ${profileUser?.name || profileUser?.username}`}
      >
        <div className="h-full grid place-items-center">
          <span className="font-semibold text-lg">No featured contributions.</span>
        </div>
      </FeatureSection>
    </section>
  );
}
