// Lib Imports.
import Link from "next/link";

// Component.
export default function Navbar() {
  return (
    <nav className="w-full px-12 py-6 flex justify-between items-center">
      <h1 className="text-4xl font-semibold">
        <Link href="/">Projectify</Link>
      </h1>

      <ul className="flex justify-between items-center gap-12">
        <li>
          <Link href="/#about" className="text-xl">
            About
          </Link>
        </li>
        <li>
          <Link href="/#projects" className="text-xl">
            Featured
          </Link>
        </li>
        <li>
          <Link href="/#contact" className="text-xl">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}
