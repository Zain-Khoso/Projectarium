'use client';

// Lib Imports.
import Image from 'next/image';

// Types.
type Props = {
  src: string | null | undefined;
  size?: number;
};

export default function Avatar({ src, size = 35 }: Props) {
  return (
    <Image
      alt="Avatar"
      src={src || '/images/user-placeholder.png'}
      width={size}
      height={size}
      className="rounded-full"
    />
  );
}
