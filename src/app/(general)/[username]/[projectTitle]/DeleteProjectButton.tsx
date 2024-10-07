'use client';

// Hooks.
import useDeleteProjectModal from '@/hooks/useDeleteProjectModal';

// Icons.
import { TbTrash } from 'react-icons/tb';

// Components.
import { IconButton } from '@/components/Button';
import { DeleteProjectModal } from '@/components/modals';

// Types.
import { User, Project } from '@prisma/client';
type Props = {
  project: Project;
};

// Component.
export default function DeleteProjectButton({ project }: Props) {
  const deleteProjectModal = useDeleteProjectModal();

  return (
    <>
      <IconButton icon={TbTrash} onClick={deleteProjectModal.onOpen} outline />

      <DeleteProjectModal
        isOpen={deleteProjectModal.isOpen}
        onClose={deleteProjectModal.onClose}
        project={project}
      />
    </>
  );
}
