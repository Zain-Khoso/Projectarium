// Lib Imports.
import { useRef, useLayoutEffect, useContext } from 'react';
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentSnapshot,
} from 'firebase/firestore';

// Local Imports.
import { firestore } from '@/configs/firebase';
import { ScrollContext } from './context';
import { cn } from '@/utils/utils';

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

    let lastDoc: DocumentSnapshot | null = null;
    let isFetching = false;

    // Intersection Handler.
    const fetchMoreProjects: IntersectionObserverCallback = async function (entries) {
      const [{ isIntersecting }] = entries;

      if (!isIntersecting) return;

      dispatch({ type: 'Fetching' });
      isFetching = true;

      try {
        const projectsQ = lastDoc
          ? query(
              collection(firestore, 'projects'),
              where('lifecycleStatus', '==', 'Published'),
              orderBy('createdAt', 'desc'),
              limit(9),
              startAfter(lastDoc)
            )
          : query(
              collection(firestore, 'projects'),
              where('lifecycleStatus', '==', 'Published'),
              orderBy('createdAt', 'desc'),
              limit(9)
            );

        const snapshot = await getDocs(projectsQ);

        if (snapshot.empty) observer.disconnect();
        else lastDoc = snapshot.docs.at(-1)!;

        dispatch({
          type: 'Update',
          projects: snapshot.docs.map((item) => {
            return { id: item.id, ...item.data() };
          }),
        });
        isFetching = false;
      } catch {
        dispatch({ type: 'Error' });
      }
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
