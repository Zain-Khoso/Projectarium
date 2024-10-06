'use client';

// Hooks.
import useEditProjectModal from '@/hooks/useEditProjectModal';

// Icons.
import { TbEdit } from 'react-icons/tb';

// Components.
import { IconButton } from '@/components/Button';
import { EditProjectModal } from '@/components/modals';

// Types.
import { Project } from '@prisma/client';
type Props = {
  project: Project;
};

// Component.
export default function EditProjectButton({ project }: Props) {
  const editProjectModal = useEditProjectModal();

  return (
    <>
      <IconButton icon={TbEdit} onClick={editProjectModal.onOpen} outline />

      <EditProjectModal
        isOpen={editProjectModal.isOpen}
        onClose={editProjectModal.onClose}
        project={project}
      />
    </>
  );
}
