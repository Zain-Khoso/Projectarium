'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, SetStateAction, Dispatch } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

// Icons.
import { FaCheckCircle } from 'react-icons/fa';

// Components.
import Modal from './base';
import Heading from '../Heading';
import { Input } from '../Input';

// Types.
import { Comment } from '@prisma/client';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  onControlsClose: () => void;
  comment: Comment;
};

// Component.
export default function EditCommentModal({
  isOpen,
  onClose,
  setDisabled,
  onControlsClose,
  comment,
}: Props) {
  const router = useRouter();

  const {
    watch,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      text: comment.text || '',
    },
  });

  const text = watch('text');

  useEffect(() => {
    setValue('text', comment.text || '');
  }, [isOpen]);

  const onTextChange = useCallback(
    (value: string) => {
      setValue('text', value);

      clearErrors('text');
    },
    [setValue, clearErrors]
  );

  const onSubmit: SubmitHandler<FieldValues> = async function (data) {
    const { text } = data;

    if (text.length === 0) return setError('text', { message: 'Text is required.' });

    setDisabled(true);

    try {
      await axios.post(`/api/projects/comments/${comment.id}`, { text });
    } catch {
      toast.error('Something went wrong.');
    } finally {
      handleClose();
      setDisabled(false);
      router.refresh();
    }
  };

  const handleClose = function () {
    reset();
    onClose();
    onControlsClose();
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Edit your comment" />

      <div className="flex flex-col gap-4">
        <Input
          id="text"
          label="Text"
          disabled={isSubmitting || isLoading}
          value={text}
          onChange={onTextChange}
          errors={errors}
          required
        />
      </div>
    </div>
  );

  return (
    <Modal
      title="Edit your comment"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={'Confirm'}
      actionIcon={FaCheckCircle}
      body={bodyContent}
      disabled={isSubmitting || isLoading}
    />
  );
}
