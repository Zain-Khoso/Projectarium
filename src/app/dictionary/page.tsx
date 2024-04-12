// Lib Imports.
import type { Metadata } from "next";

// Local Imports.
import DictionaryForm from "@/components/DictionaryForm";

// Metadata.
export const metadata: Metadata = {
  title: "Dictionary | Projectify",
  description:
    "A swift, user-friendly, and dependable dictionary tool, ensuring quick access to accurate definitions.",
};

// Component.
export default function DictionaryPage() {
  return (
    <main className="flex flex-col gap-8 my-8 md:my-2 sm:my-0 xs:my-0">
      <h1 className="text-4xl text-white text-center underline">Dictionary</h1>

      <DictionaryForm />
    </main>
  );
}
