'use client';

// Types.
import { IconType } from 'react-icons';
type Props = {
  icon: IconType;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick: () => void;
  outline?: boolean;
  small?: boolean;
};

// Component.
export default function IconButton({
  icon: Icon,
  type = 'button',
  disabled,
  onClick,
  outline,
  small,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative w-fit flex flex-row items-center justify-between disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition aspect-square ${
        outline ? 'bg-white border-black text-black' : 'bg-sky-500 border-sky-500 text-white'
      } ${small ? 'p-1 text-sm font-light border-[1px]' : 'py-2 px-4 text-md font-semibold border-2'}`}
    >
      <Icon />
    </button>
  );
}
