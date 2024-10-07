// Lib Imports.
import { useState } from 'react';

// Types.
type ModalT = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// Hook.
export default function useModal(): ModalT {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
}
