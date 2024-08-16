'use client';

// Lib Imports.
import Image from 'next/image';

// Types.
type Props = {
  src: string | null | undefined;
};

export default function Avatar({ src }: Props) {
  return (
    <Image
      alt="Avatar"
      src={src || '/images/user-placeholder.png'}
      width={35}
      height={35}
      className="rounded-full"
    />
  );
}
