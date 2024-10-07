'use client';

// Hooks.
import useModal from '@/hooks/useModal';

// Components.
import { Button } from '@/components/Button';
import { EditProfileModal } from '@/components/modals';

// Types.
import { User } from '@prisma/client';
type Props = {
  currentUser: User | null;
};

// Component.
export default function EditProfileButton({ currentUser }: Props) {
  const editProfileModal = useModal();

  return (
    <>
      <Button small outline label="Edit Profile" onClick={editProfileModal.onOpen} />

      <EditProfileModal
        isOpen={editProfileModal.isOpen}
        onClose={editProfileModal.onClose}
        currentUser={currentUser}
      />
    </>
  );
}
