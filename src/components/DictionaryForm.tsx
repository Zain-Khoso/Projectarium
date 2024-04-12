"use client";

// Lib Imports.
import { useState } from "react";

// Local Imports.
import { ButtonPrimary } from "@/components/Button";

// Types.
type DataT = {
  word: string;
  phonetic: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: [];
      antonyms: [];
      example: string;
    }[];
    synonyms: [];
    antonyms: [];
  }[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}[];

// Component.
export default function DictionaryForm() {
  const [query, setQuery] = useState("");
  const [word, setWord] = useState("Word");
  const [definition, setDefinition] = useState("Definition");

  const getDefinition = async function () {
    if (!query) return;

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      const data: DataT = await res.json();

      setWord(data[0].word);
      setDefinition(data[0].meanings[0].definitions[0].definition);
    } catch {
      setWord("Error");
      setDefinition(`There is no such word as ${query}`);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center items-end">
        <input
          type="text"
          placeholder="Search The Word From Here."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-2/4 bg-gray-800 rounded bg-opacity-40 border border-gray-700 focus:ring-2 focus:ring-green-900 focus:bg-transparent focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out relative mr-4 md:w-full lg:w-full xl:w-1/2 md:mx-8 lg:mx-8"
        />
        <ButtonPrimary onClick={getDefinition}>Search</ButtonPrimary>
      </div>
      <div className="w-1/2 h-2/5 bg-gray-700 p-4 rounded-xl mx-auto mt-10">
        <h1 className="text-white text-xl text-center pb-2 border-b mb-2">
          {word}
        </h1>
        <p className="text-white text-center text-md">{definition}</p>
      </div>
    </>
  );
}
