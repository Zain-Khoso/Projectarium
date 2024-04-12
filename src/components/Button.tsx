// Types.
type Props = {
  children: React.ReactNode;
};

export function ButtonPrimary({ children }: Props) {
  return (
    <button className="flex justify-between items-center font-semibold px-4 py-2 bg-green-500 rounded-lg">
      {children}
    </button>
  );
}

export function ButtonSecondary({ children }: Props) {
  return (
    <button className="flex justify-between items-center font-semibold px-4 py-2 bg-slate-500 rounded-lg">
      {children}
    </button>
  );
}
