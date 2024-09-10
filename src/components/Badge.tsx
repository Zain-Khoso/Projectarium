// Types.
type Props = {
  label: string;
  outline?: boolean;
};

// Component.
export default function Badge({ label, outline = false }: Props) {
  return (
    <span
      className={`
        font-semibold
        text-xs 
        py-1
        px-2
        rounded-full
        border
        border-sky-500 
        ${outline ? 'bg-transparent text-sky-500' : 'bg-sky-500 text-white'}
      `}
    >
      {label}
    </span>
  );
}
