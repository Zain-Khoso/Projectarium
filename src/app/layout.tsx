// Lib Imports.
import { Inter } from "next/font/google";

// Local Imports.
import "./globals.css";
import Navbar from "@/components/Navbar";

// Types.
type Props = {
  children: React.ReactNode;
};

// Font.
const inter = Inter({ subsets: ["latin"] });

// Components.
export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body
        className={`w-screen overflow-x-hidden overflow-y-auto ${inter.className}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
