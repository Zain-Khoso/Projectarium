// Libs.
import Image from 'next/image';
import Link from 'next/link';

// Images.
import LogoImage from '@/app/icon.png';

// Component.
export default function Branding() {
  return (
    <Link href="/" className="flex flex-row items-center gap-2">
      <Image alt="Application logo" src={LogoImage} width={46} height={46} />

      <h2 className="text-2xl font-semibold">Projectarium</h2>
    </Link>
  );
}
