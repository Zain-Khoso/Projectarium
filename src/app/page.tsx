// Actions.
import getCurrentUser from '@/actions/getCurrentUser';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';
import InfiniteScroll from '@/components/InfiniteScroll';

// Component.
export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container>
        <InfiniteScroll />
      </Container>
    </>
  );
}
