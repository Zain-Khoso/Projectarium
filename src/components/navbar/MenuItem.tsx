// Lib Imports.
import Link from 'next/link';

// Types.
import { IconType } from 'react-icons';
type Props = {
  href: string;
  label: string;
  icon?: IconType;
};

export default function MenuItem({ href, label, icon: Icon }: Props) {
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
