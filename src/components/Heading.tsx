// Types.
type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

// Component.
export default function Heading({ title, subtitle, center }: Props) {
  return (
    <div className={`w-full ${center ? 'text-center' : 'text-start'}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="font-light text-neutral-500 mt-2">{subtitle}</span>
    </div>
  );
}
