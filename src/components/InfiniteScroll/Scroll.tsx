// Lib Imports.
import { useRef, useLayoutEffect, useContext } from 'react';

// Local Imports.
import { ScrollContext } from './context';
import { cn } from '@/utils/utils';

// Types.
type Props = {
  children: React.ReactNode;
};

// Component.
export default function Scroll({ children }: Props) {
  const isMounted = useRef(false);
  const scrollElem = useRef(null);
  const [_, dispatch] = useContext(ScrollContext);

  useLayoutEffect(() => {
    const { current: elem } = scrollElem;

    if (!elem || isMounted.current) return;
    isMounted.current = true;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '1000px',
      threshold: 1,
    };

    // Intersection Handler.
    const fetchMoreProjects: IntersectionObserverCallback = async function (entries) {
      const [{ isIntersecting }] = entries;

      if (isIntersecting) dispatch({ type: 'Fetch' });
    };

    const observer = new IntersectionObserver(fetchMoreProjects, observerOptions);

    observer.observe(elem);
  }, []);

  return (
    <section
      className={cn(
        'max-w-screen-xl grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-start gap-8 px-2 py-8 mx-auto'
      )}
    >
      {children}

      <div ref={scrollElem} className={cn('w-full h-1')}></div>
    </section>
  );
}
