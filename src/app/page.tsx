// Lib Imports.
import type { Metadata } from "next";

// Metadata.
export const metadata: Metadata = {
  title: "Projectify",
  description: "World class Frontend project ideas, For Beginners.",
};

// Component.
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl">Hello World</h1>
    </main>
  );
}
