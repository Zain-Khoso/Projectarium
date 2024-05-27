// Types.
type Props = {
  children: React.ReactNode;
  className?: string;
};

export function H1({ children, className }: Props) {
  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: Props) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: Props) {
  return (
    <h2 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>{children}</h2>
  );
}

export function H4({ children, className }: Props) {
  return (
    <h2 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>{children}</h2>
  );
}

export function P({ children, className }: Props) {
  return <h2 className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>{children}</h2>;
}

export function Blackquote({ children, className }: Props) {
  return <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>{children}</blockquote>;
}

export function List({ children, className }: Props) {
  return <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>{children}</ul>;
}

export function InlineCode({ children, className }: Props) {
  return (
    <code
      className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
    >
      {children}
    </code>
  );
}

export function Lead({ children, className }: Props) {
  return (
    <p className={`text-xl text-muted-foreground text-center text-pretty ${className}`}>
      {children}
    </p>
  );
}

export function Large({ children, className }: Props) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
}

export function Small({ children, className }: Props) {
  return <small className={`text-sm font-medium leading-none ${className}`}>{children}</small>;
}

export function Muted({ children, className }: Props) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
}
