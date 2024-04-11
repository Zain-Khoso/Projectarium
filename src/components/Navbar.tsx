// Lib Imports.
import Link from "next/link";

// Component.
export default function Navbar() {
  return (
    <nav className="w-full px-12 py-6 flex justify-between items-center">
      <h1 className="text-4xl">
        <Link href="/">Projectify</Link>
      </h1>

      <ul className="flex justify-between items-center gap-12">
        <li>
          <Link href="/#about" className="text-xl">
            About
          </Link>
        </li>
        <li>
          <Link href="/#products" className="text-xl">
            Products
          </Link>
        </li>
        <li>
          <Link href="/#contact-us" className="text-xl">
            Contact Us
          </Link>
        </li>
        <li>
          <Link
            href="/log-in"
            className="text-xl bg-green-600 px-6 py-3 rounded-xl"
          >
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  );
}
