// Lib Imports.
import Link from "next/link";

// Types.
export type FeatureT = {
  title: string;
  link: string;
  external: boolean;
  desc: string;
};

// Components.
export default function FeatureCard({
  title,
  link,
  external = false,
  desc,
}: FeatureT) {
  return (
    <Link href={link} target={external ? "_blank" : "_self"}>
      <div className="w-full h-full bg-slate-800 border border-slate-400 rounded-lg p-4">
        <h4 className="text-xl font-medium mb-2">{title}</h4>
        <p className="text-lg text-slate-400">{desc}</p>
      </div>
    </Link>
  );
}
