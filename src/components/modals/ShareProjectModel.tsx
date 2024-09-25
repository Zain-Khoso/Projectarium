'use client';

// Components.
import Modal from './base';

// Types.
import { Project } from '@prisma/client';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
};

// Component.
export default function ShareProjectModel({ isOpen, onClose, project }: Props) {
  let bodyContent = <></>;

  return (
    <Modal title={`Share ${project.title}`} isOpen={isOpen} onClose={onClose} body={bodyContent} />
  );
}
