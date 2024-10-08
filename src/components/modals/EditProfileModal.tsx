'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

// Hooks.
import useCountries from '@/hooks/useCountries';

// Icons.
import { FaArrowCircleLeft, FaArrowCircleRight, FaCheckCircle } from 'react-icons/fa';

// Utils.
import { isValidURL, isValidUsername } from '@/libs/validations';
import { formatURL } from '@/libs/formatters';

// Components.
import Modal from './base';
import Heading from '../Heading';
import { Input, Textarea, ImageUpload } from '../Input';
import CountrySelect from '../Input/CountrySelect';

// Types.
import { User } from '@prisma/client';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
};
enum STEPS {
  USERNAME_IMAGE = 0,
  NAME_BIO = 1,
  LOCATION_WEBSITE = 2,
}

// Component.
export default function EditProfileModal({ isOpen, onClose, currentUser }: Props) {
  const router = useRouter();

  const { getByValue } = useCountries();

  const {
    watch,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      username: currentUser?.username || '',
      image: currentUser?.image || '',
      name: currentUser?.name || '',
      bio: currentUser?.bio || '',
      location: currentUser?.locationValue ? getByValue(currentUser.locationValue) : '',
      website: currentUser?.website || '',
    },
  });

  const username = watch('username');
  const name = watch('name');
  const bio = watch('bio');
  const website = watch('website');
  const location = watch('location');

  const [step, setStep] = useState(STEPS.USERNAME_IMAGE);

  useEffect(() => {
    setValue('username', currentUser?.username || '');
    setValue('image', currentUser?.image || '');
    setValue('name', currentUser?.name || '');
    setValue('bio', currentUser?.bio || '');
    setValue('location', currentUser?.locationValue ? getByValue(currentUser.locationValue) : '');
    setValue('website', currentUser?.website || '');
  }, [
    isOpen,
    setValue,
    getByValue,
    currentUser?.username,
    currentUser?.image,
    currentUser?.name,
    currentUser?.bio,
    currentUser?.locationValue,
    currentUser?.website,
  ]);

  const onNext = () => setStep((value) => value + 1);
  const onBack = () => setStep((value) => value - 1);

  const onInputChange = useCallback(
    (id: string, value: string) => {
      setValue(id, value);

      clearErrors(id);
    },
    [setValue, clearErrors]
  );

  const onSubmit: SubmitHandler<FieldValues> = async function (data) {
    const { username, image, name, bio, location, website } = data;

    if (step === STEPS.USERNAME_IMAGE) {
      if (username.length === 0) return setError('username', { message: 'Username is required.' });

      if (username.length > 14 || !isValidUsername(username)) {
        toast.error('14 alpha-numeric characters atmost.');

        return setError('username', { message: '14 alpha-numeric characters atmost.' });
      }

      try {
        const response = await axios.post('/api/users/username-already-exists', {
          username,
          currentUserId: currentUser?.id,
        });

        if (!response.data.isClear) {
          toast.error('Username already taken.');

          return setError('username', { message: 'Username takenalready .' });
        }
      } catch {
        toast.error('Something went wrong.');

        return setError('username', { message: 'Something went wrong.' });
      }

      return onNext();
    }

    if (step === STEPS.NAME_BIO) {
      if (name.length > 20) {
        toast.error('20 characters atmost.');

        return setError('name', { message: '20 characters atmost.' });
      }

      return onNext();
    }

    if (step === STEPS.LOCATION_WEBSITE) {
      if (website !== '' && !isValidURL(website)) {
        toast.error('Invalid URL.');

        return setError('website', { message: 'Invalid URL.' });
      }

      try {
        const response = await axios.post('/api/users', {
          currentUserId: currentUser?.id,
          username,
          image,
          name: name || '',
          bio: bio || '',
          locationValue: location?.value || '',
          website: formatURL(website),
        });

        toast.success('Profile updated.');
        reset();
        setStep(STEPS.USERNAME_IMAGE);
        onClose();
        if (response.data.username === currentUser?.username) router.refresh();
        else router.push(`/${username}`);
      } catch {
        toast.error('Something went wrong.');
        reset();
        setStep(STEPS.USERNAME_IMAGE);
        onClose();
        router.refresh();
      }
    }
  };

  const handleClose = function () {
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
          label="Username *"
          value={username}
          onChange={(value) => onInputChange('username', value)}
          errors={errors}
          required
        />

        <ImageUpload
          id="image"
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
            onChange={(value) => onInputChange('name', value)}
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
            onChange={(value) => onInputChange('website', value)}
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
      onClose={handleClose}
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
