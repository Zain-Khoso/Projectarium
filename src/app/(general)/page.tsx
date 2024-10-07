// Actions.
import getCurrentUser from '@/actions/getCurrentUser';

// Components.
import Container from '@/components/Container';
import InfiniteScroll from '@/components/InfiniteScroll';

// Component.
export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <InfiniteScroll currentUser={currentUser} />
    </Container>
  );
}
