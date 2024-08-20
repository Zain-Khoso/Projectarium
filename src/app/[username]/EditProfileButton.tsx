'use client';

// Hooks.
import useEditProfileModal from '@/hooks/useEditProfileModal';

// Components.
import { Button } from '@/components/Button';
import { EditProfileModal } from '@/components/modals';

// Component.
export default function EditProfileButton() {
  const editProfileModal = useEditProfileModal();

  return (
    <>
      <Button small outline label="Edit Profile" onClick={editProfileModal.onOpen} />
      <EditProfileModal isOpen={editProfileModal.isOpen} onClose={editProfileModal.onClose} />
    </>
  );
}
