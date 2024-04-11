// Types.
type Props = {
  children: React.ReactNode;
};

// Component.
export default function Container({ children }: Props) {
  return <div className="max-w-[1440px] mx-auto">{children}</div>;
}
