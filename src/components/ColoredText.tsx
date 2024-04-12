// Types.
type Props = {
  children: React.ReactNode;
};

// Copmponent.
export default function ColoredText({ children }: Props) {
  return <span className="text-green-500">{children}</span>;
}
