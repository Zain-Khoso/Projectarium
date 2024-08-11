// Libs.
import Image from 'next/image';
import Link from 'next/link';

// Images.
import LogoImage from '@/app/icon.png';

// Component.
export default function Branding() {
  return (
    <Link href="/" className="hidden md:flex flex-row items-center gap-4">
      <Image alt="Application logo" src={LogoImage} width={52} height={52} />

      <h2 className="text-2xl font-semibold">Projectarium</h2>
    </Link>
  );
}
