'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Hooks.
import useModal from '@/hooks/useModal';

// Icons.
import { TbDots, TbEdit, TbTrash } from 'react-icons/tb';

// Components.
import ControlOption from './ControlOption';
import EditCommentModal from '../modals/EditCommentModal';

// Types.
import { Comment } from '@prisma/client';
type Props = {
  comment: Comment;
};

// Component.
export default function CommentControls({ comment }: Props) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useModal();
  const [disabled, setDisabled] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleDelete = useCallback(async () => {
    setDisabled(true);

    try {
      await axios.delete(`/api/projects/comments/${comment.id}`);
    } catch {
      toast.error('Something went wrong.');
    } finally {
      router.refresh();
    }
  }, [comment.id, router]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="p-1 rounded-md hover:bg-neutral-100"
      >
        <TbDots />
      </button>

      <div
        className={`${isOpen ? 'flex' : 'hidden'} flex-col absolute bg-white shadow-[0_0_0.5rem_rgba(0,0,0,0.15)] rounded-lg mb-2 overflow-hidden`}
      >
        <ControlOption
          label="Edit"
          icon={TbEdit}
          disabled={disabled}
          onClick={() => setIsModelOpen(true)}
        />
        <EditCommentModal
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          setDisabled={setDisabled}
          onControlsClose={onClose}
          comment={comment}
        />

        <ControlOption label="Delete" icon={TbTrash} disabled={disabled} onClick={handleDelete} />
      </div>
    </div>
  );
}
