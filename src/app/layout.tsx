// Lib Imports.
import { Inter } from "next/font/google";
import type { Metadata } from "next";

// Local Imports.
import "./globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types.
type Props = {
  children: React.ReactNode;
};

// Metadata.
export const metadata: Metadata = {
  title: "Projectify",
  description: "World class Frontend project ideas, For Beginners.",
  applicationName: "Projectify",
  authors: [{ name: "Zain Khoso", url: "https://github.com/Zain-Khoso" }],
  keywords: [
    "projectify",
    "ideas",
    "projects",
    "frontend",
    "backend",
    "fullstack",
  ],
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
        <Container>
          <Navbar />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
