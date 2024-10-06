'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useCallback, ReactEventHandler } from 'react';
import axios from 'axios';

// Icons.
import { TbSend } from 'react-icons/tb';
import { User } from '@prisma/client';

// Types.
type Props = {
  projectId: string;
  currentUser?: User | null;
};

// Component.
export default function CommentForm({ projectId, currentUser }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');

  const handleChange: ReactEventHandler = useCallback((event) => {
    event.preventDefault();
    setText((event.target as HTMLTextAreaElement).value);
  }, []);

  const handleSubmit: ReactEventHandler<HTMLFormElement> = async function (event) {
    event.preventDefault();

    if (!currentUser) router.push('/login');

    if (text.length === 0) return;

    setIsLoading(true);
    try {
      await axios.post('/api/projects/comments', { projectId, text });

      setText('');
      router.refresh();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-screen-md flex flex-row gap-2">
      <input
        type="text"
        placeholder="Comment"
        className="flex-1 border border-neutral-400 py-1 px-2 rounded-lg focus:outline-none focus:border-black disabled:cursor-not-allowed"
        value={text}
        onChange={handleChange}
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-neutral-800 p-2 rounded-lg disabled:cursor-not-allowed"
      >
        <TbSend className="stroke-white" />
      </button>
    </form>
  );
}
