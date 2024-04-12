// Lib Imports.
import Link from "next/link";
import Image from "next/image";

// Component.
export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-between items-center px-4 py-8 gap-8">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <h1 className="text-2xl font-semibold">
          <Link href="/">Projectify</Link>
        </h1>
        <span className="text-md text-slate-400">
          &copy; All rights reserved 2022 - {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex justify-center items-center gap-8">
        <Link href="https://github.com/Zain-Khoso">
          <Image alt="Github" src="/icons/github.svg" width={40} height={40} />
        </Link>
        <Link href="https://facebook.com/ZAIN1KHOSO">
          <Image
            alt="Github"
            src="/icons/facebook.webp"
            width={40}
            height={40}
          />
        </Link>
        <Link href="https://instagram.com/node_zain.js">
          <Image
            alt="Github"
            src="/icons/instagram.webp"
            width={40}
            height={40}
          />
        </Link>
      </div>
    </footer>
  );
}
