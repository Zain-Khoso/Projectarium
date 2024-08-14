'use client';

// Lib Imports.
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Types.
import { IconType } from 'react-icons';
type Props = {
  href: string | false;
  label: string;
  icon?: IconType;
  onClick?: () => void;
};

export default function MenuItem({ href, label, icon: Icon, onClick }: Props) {
  const router = useRouter();

  if (href === false)
    return (
      <div
        onClick={onClick ? onClick : () => router.refresh()}
        className="flex flex-row items-center justify-start gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
        {Icon && <Icon className="fill-neutral-800" size={16} />}

        <span className="font-bold text-neutral-800">{label}</span>
      </div>
    );

  return (
    <Link
      href={href}
      className="flex flex-row items-center justify-start gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {Icon && <Icon className="fill-neutral-800" size={16} />}

      <span className="font-bold text-neutral-800">{label}</span>
    </Link>
  );
}
