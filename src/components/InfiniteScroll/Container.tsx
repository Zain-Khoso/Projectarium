// Types.
type Props = {
  children: React.ReactNode;
};

// Local Imports.
import { cn } from '@/utils/utils';

// Component.
export default function CardsContainer({ children }: Props) {
  return (
    <section
      className={cn(
        'max-w-screen-xl grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-start gap-8 px-2 py-8 mx-auto'
      )}
    >
      {children}
    </section>
  );
}
