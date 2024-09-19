'use client';

// Lib Imports.
import Link from 'next/link';

// Icons.
import { MdErrorOutline } from 'react-icons/md';

// Components.
import Navbar from '@/components/navbar/Navbar';

// Types.
type Props = {
  error: Error;
  reset: () => void;
};

// Application Error Page.
export default function error({ error, reset }: Props) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-8 flex flex-col items-center gap-4">
        <MdErrorOutline size={80} className="fill-rose-500" />

        <h1 className="text-2xl lg:text-4xl text-neutral-600 text-center text-pretty">
          Oops something went wrong.
        </h1>

        <p className="text-neutral-600 font-light">
          Go back to{' '}
          <Link href={'/'} className="text-sky-500 font-semibold">
            Home page
          </Link>
        </p>
      </main>
    </>
  );
}
