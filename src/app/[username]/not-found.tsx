// Lib Imports.
import Link from 'next/link';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';

// Icons.
import { TbError404 } from 'react-icons/tb';

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
        <main className="min-h-screen pt-28 pb-8 flex flex-col items-center gap-4">
          <TbError404 size={120} className="fill-rose-500" />

          <h1 className="text-2xl lg:text-4xl text-neutral-600 text-center text-pretty">
            This profile does not exist.
          </h1>

          <p className="text-neutral-600 font-light">
            Go back to{' '}
            {currentUser ? (
              <Link href={`/${currentUser.username}`} className="text-sky-500 font-semibold">
                Your Profile
              </Link>
            ) : (
              <Link href="/" className="text-sky-500 font-semibold">
                Home page
              </Link>
            )}
          </p>
        </main>
      </Container>
    </>
  );
}
