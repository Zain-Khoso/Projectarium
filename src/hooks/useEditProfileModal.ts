// Lib Imports.
import { create } from 'zustand';

// Types.
type EditProfileModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// Hook to manage Edit Profile Modal
const useEditProfileModal = create<EditProfileModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditProfileModal;
