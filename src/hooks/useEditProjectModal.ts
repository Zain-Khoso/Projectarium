// Lib Imports.
import { create } from 'zustand';

// Types.
type EditProjectModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// Hook to manage Edit Project Modal
const useEditProjectModal = create<EditProjectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditProjectModal;
