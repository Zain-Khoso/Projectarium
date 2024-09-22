// Lib Imports.
import Link from 'next/link';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';

// Profile Not Found Page.
export default async function ProfileNotFoundPage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container>
        <main className="min-h-screen pt-32 pb-8 flex flex-col items-center gap-4">
          <h4 className="text-2xl font-bold text-pretty text-center">
            You currently have no bookmarks
          </h4>

          <p className="text-neutral-600 font-light">
            Go back to{' '}
            <Link href="/" className="text-sky-500 font-semibold">
              Home page
            </Link>
          </p>
        </main>
      </Container>
    </>
  );
}
