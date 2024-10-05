'use client';

// Hooks.
import useTechnologies from '@/hooks/useTechnologies';

// Components.
import Heading from '@/components/Heading';

// Types.
type Props = {
  heading: string;
  technologies: string[];
};

// Component.
export default function Header({ heading, technologies }: Props) {
  const { getByValue } = useTechnologies();

  return (
    <Heading title={heading}>
      {technologies.map((technology) => {
        const tech = getByValue(technology);

        if (!tech) return '';

        const { value, icon: Icon, label } = tech;

        return (
          <div key={value} className="flex flex-row items-center justify-center gap-1">
            <Icon size={14} className="fill-neutral-500" />
            <span className="text-neutral-500 text-lg">{label}</span>
          </div>
        );
      })}
    </Heading>
  );
}
