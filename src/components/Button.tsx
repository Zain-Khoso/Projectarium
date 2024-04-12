// Types.
type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export function ButtonPrimary({ children, disabled = false, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex justify-center items-center font-semibold px-4 py-2 bg-green-500 rounded-lg disabled:opacity-60"
    >
      <div className="flex justify-between items-center gap-2 font-semibold">
        {children}
      </div>
    </button>
  );
}

export function ButtonSecondary({ children, disabled = false }: Props) {
  return (
    <button
      disabled={disabled}
      className="flex justify-center items-center font-semibold px-4 py-2 bg-slate-500 rounded-lg disabled:opacity-60"
    >
      <div className="flex justify-between items-center gap-2 font-semibold">
        {children}
      </div>
    </button>
  );
}
