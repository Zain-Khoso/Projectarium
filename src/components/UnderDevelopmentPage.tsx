// Types.
type Props = {
  title: string;
};

// Component.
export default function UnderDevelopmentPage({ title }: Props) {
  return (
    <div className="w-[100dvw] h-[100dvh] grid place-items-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
}
