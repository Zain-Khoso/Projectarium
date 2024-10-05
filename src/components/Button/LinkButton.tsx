// Lib Imports.
import Link from 'next/link';

// Types.
import { IconType } from 'react-icons';
type Props = {
  label: string;
  icon?: IconType;
  iconSide?: 'left' | 'right';
  href: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  outline?: boolean;
  small?: boolean;
};

// Component.
export default function LinkButton({
  label,
  icon: Icon,
  iconSide = 'left',
  href,
  target = '_self',
  outline,
  small,
}: Props) {
  return (
    <Link
      href={href}
      target={target}
      className={`relative w-full flex flex-row items-center justify-between disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition ${
        outline ? 'bg-white border-black text-black' : 'bg-sky-500 border-sky-500 text-white'
      } ${small ? 'p-1 text-sm font-light border-[1px]' : 'py-2 px-4 text-md font-semibold border-2'}`}
    >
      {Icon && iconSide === 'left' && <Icon />}

      <span className="flex-1 text-center font-semibold">{label}</span>

      {Icon && iconSide === 'right' && <Icon />}
    </Link>
  );
}
