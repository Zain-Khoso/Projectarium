// Lib Imports.
import Link from 'next/link';

// Actions.
import getCurrentUser from '@/actions/getCurrentUser';

// Icons.
import { TbError404 } from 'react-icons/tb';

// Components.
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/Container';

// Project Not Found Page.
export default async function ProjectNotFoundPage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />

      <Container>
        <main className="min-h-screen pt-28 pb-8 flex flex-col items-center gap-4">
          <TbError404 size={120} className="fill-rose-500" />

          <h1 className="text-2xl lg:text-4xl text-neutral-600 text-center text-pretty">
            This project does not exist.
          </h1>

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
