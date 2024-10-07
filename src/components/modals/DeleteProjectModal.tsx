'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Icons.
import { TbThumbUpFilled, TbThumbDownFilled } from 'react-icons/tb';

// Components.
import Modal from './base';
import Heading from '../Heading';

// Types.
import { Project } from '@prisma/client';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
};

// Component.
export default function EditProjectModal({ isOpen, onClose, project }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Delete ${project.title}`}
        subtitle={`Are you sure you want to delete ${project.title}.`}
      />
    </div>
  );

  const deleteProject = useCallback(async function () {
    setIsLoading(true);

    try {
      const response = await axios.delete(`/api/projects/project/${project.title}`);
      toast.success(`Deleted ${project.title}`);
      router.push(response.data.redirectUrl);
    } catch {
      toast.error(`Unable to delete ${project.title}`);
      router.refresh();
    } finally {
      setIsLoading(false);
      onClose();
    }
  }, []);

  return (
    <Modal
      title="Delete project"
      isOpen={isOpen}
      onClose={onClose}
      body={bodyContent}
      actionLabel="Yes"
      actionIcon={TbThumbUpFilled}
      onSubmit={deleteProject}
      secondaryActionLabel="No"
      secondaryActionIcon={TbThumbDownFilled}
      secondaryAction={onClose}
      disabled={isLoading}
    />
  );
}
