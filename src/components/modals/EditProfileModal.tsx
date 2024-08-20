'use client';

// Lib Imports.
import { useState } from 'react';

// Icons.
import { FaArrowCircleLeft, FaArrowCircleRight, FaCheckCircle } from 'react-icons/fa';

// Components.
import Modal from './base';

// Types.
type Props = {
  isOpen: boolean;
  onClose: () => void;
};
enum STEPS {
  USERNAME_IMAGE = 0,
  NAME_BIO = 1,
  LOCATION_WEBSITE = 2,
}

// Component.
export default function EditProfileModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(STEPS.USERNAME_IMAGE);

  const onNext = () => setStep((value) => value + 1);
  const onBack = () => setStep((value) => value - 1);

  const handleSubmit = function () {
    if (step !== STEPS.LOCATION_WEBSITE) return onNext();

    setStep(STEPS.USERNAME_IMAGE);
    onClose();
  };

  return (
    <Modal
      title="Edit your profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryAction={onBack}
      actionLabel={step === STEPS.LOCATION_WEBSITE ? 'Confirm' : 'Next'}
      actionIcon={step === STEPS.LOCATION_WEBSITE ? FaCheckCircle : FaArrowCircleRight}
      secondaryActionLabel={step === STEPS.USERNAME_IMAGE ? undefined : 'Back'}
      secondaryActionIcon={FaArrowCircleLeft}
      body={<></>}
      footer={<></>}
      disabled={false}
    />
  );
}
