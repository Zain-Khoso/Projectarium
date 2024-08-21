'use client';

// Lib Imports.
import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

// Icons.
import { FaArrowCircleLeft, FaArrowCircleRight, FaCheckCircle } from 'react-icons/fa';

// Components.
import Modal from './base';
import Heading from '../Heading';
import { Input, Textarea, ImageUpload } from '../Input';
import CountrySelect from '../Input/CountrySelect';
import { isValidUsername } from '@/libs/validations';

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
  const {
    watch,
    handleSubmit,
    setError,
    getValues,
    setValue,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      image: '',
      name: '',
      bio: '',
      location: '',
      website: '',
    },
  });

  const username = watch('username');
  const name = watch('name');
  const bio = watch('bio');
  const website = watch('website');
  const location = watch('location');

  const [step, setStep] = useState(STEPS.USERNAME_IMAGE);

  const onNext = () => setStep((value) => value + 1);
  const onBack = () => setStep((value) => value - 1);

  const onSubmit: SubmitHandler<FieldValues> = async function (data) {
    if (step !== STEPS.LOCATION_WEBSITE) return onNext();

    console.log(data);
    reset();
    setStep(STEPS.USERNAME_IMAGE);
    onClose();
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Personalize Your Identity"
        subtitle="Set your unique username and choose an avatar that represents you."
      />

      <div className="flex flex-col gap-4">
        <Input
          id="username"
          label="Username"
          value={username}
          onChange={(value) => setValue('username', value)}
          errors={errors}
          required
        />

        <ImageUpload
          label="Click to upload your Avatar"
          value={getValues('image')}
          onChange={setValue}
        />
      </div>
    </div>
  );

  if (step === STEPS.NAME_BIO)
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Introduce Yourself"
          subtitle="Share your name and a brief bio to tell others about your background and skills."
        />

        <div className="flex flex-col gap-4">
          <Input
            id="name"
            label="Name"
            value={name}
            onChange={(value) => setValue('name', value)}
            errors={errors}
          />

          <Textarea
            id="bio"
            label="Bio"
            value={bio}
            onChange={(value) => setValue('bio', value)}
            errors={errors}
          />
        </div>
      </div>
    );

  if (step === STEPS.LOCATION_WEBSITE)
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Connect with the Community"
          subtitle="Provide your location and a link to your personal website or portfolio."
        />

        <div className="flex flex-col gap-4">
          <Input
            id="website"
            label="Website"
            value={website}
            onChange={(value) => setValue('website', value)}
            errors={errors}
          />

          <CountrySelect value={location} onChange={setValue} />
        </div>
      </div>
    );

  return (
    <Modal
      title="Edit your profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={onBack}
      actionLabel={step === STEPS.LOCATION_WEBSITE ? 'Confirm' : 'Next'}
      actionIcon={step === STEPS.LOCATION_WEBSITE ? FaCheckCircle : FaArrowCircleRight}
      secondaryActionLabel={step === STEPS.USERNAME_IMAGE ? undefined : 'Back'}
      secondaryActionIcon={FaArrowCircleLeft}
      body={bodyContent}
      disabled={isSubmitting || isLoading}
    />
  );
}
