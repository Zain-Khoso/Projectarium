'use client';

// Types.
import { IconType } from 'react-icons';
type Props = {
  label: string;
  icon: IconType;
  onClick: () => void;
};

// Component.
export default function ControlOption({ label, icon: Icon, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row items-center justify-start gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {Icon && <Icon className="stroke-neutral-800" size={16} />}

      <span className="text-neutral-800">{label}</span>
    </button>
  );
}
