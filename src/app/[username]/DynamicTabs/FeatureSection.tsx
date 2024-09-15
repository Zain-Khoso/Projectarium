// Components.
import Heading from '@/components/Heading';

// Types.
type Props = ChildrenProps & {
  title: string;
  subtitle: string;
};

// Component.
export default function FeatureSection({ title, subtitle, children }: Props) {
  return (
    <section className="flex flex-col gap-4 p-4">
      <Heading title={title} subtitle={subtitle} />

      <hr className="border-neutral-300" />

      <div className="min-h-[20vh]">{children}</div>
    </section>
  );
}
