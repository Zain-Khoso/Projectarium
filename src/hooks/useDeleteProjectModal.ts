// Lib Imports.
import { create } from 'zustand';

// Types.
type DeleteProjectModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// Hook to manage Delete Project Modal
const DeleteProjectModal = create<DeleteProjectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default DeleteProjectModal;
