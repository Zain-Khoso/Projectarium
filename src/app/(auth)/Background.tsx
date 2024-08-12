// Lib Imports.
import Image from 'next/image';

// Component.
export default function Background() {
  return (
    <>
      <Image
        fill
        alt="Authentication UI background image."
        src="/images/auth-bg.webp"
        className="fixed inset-0 -z-10 w-[100dvw] h-[100dvh] object-cover object-center"
      />

      <div className="fixed inset-0 -z-[8] w-[100dvw] h-[100dvh] bg-neutral-950/40"></div>
    </>
  );
}
