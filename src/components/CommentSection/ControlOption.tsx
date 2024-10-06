'use client';

// Types.
import { IconType } from 'react-icons';
type Props = {
  label: string;
  icon: IconType;
  onClick: () => void;
  disabled: boolean;
};

// Component.
export default function ControlOption({ label, icon: Icon, onClick, disabled }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex flex-row items-center justify-start gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold disabled:cursor-not-allowed"
    >
      {Icon && <Icon className="stroke-neutral-800" size={16} />}

      <span className="text-neutral-800">{label}</span>
    </button>
  );
}
