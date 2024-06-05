// Lib Imports.
import { collection, query, where, orderBy } from 'firebase/firestore';

// Local Imports.
import { firestore } from '@/configs/firebase';
import { fetchDocs } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import { Navbar } from '@/components/Navigation';
import InfiniteScroll from '@/components/InfiniteScroll';

// Component.
export default async function Home() {
  const dataQ = query(
    collection(firestore, 'projects'),
    where('lifecycleStatus', '==', 'Published'),
    orderBy('createdAt', 'desc')
  );
  const data = await fetchDocs(dataQ);

  const projects = data?.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return (
    <main className={cn('min-w-dvw min-h-dvh')}>
      <Navbar />

      <InfiniteScroll projects={projects!} />
    </main>
  );
}
