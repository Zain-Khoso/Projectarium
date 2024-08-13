'use client';

// Lib Imports.
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

// Local Imports.
import { isValidEmail, isValidUsername } from '@/libs/validations';

// Components.
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

// Icons.
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

// Types.
enum STEPS {
  EmailUsername = 0,
  FullNamePicture = 1,
  PortfolioURLBio = 2,
  LocationSocialMedia = 3,
  Password = 4,
}

// Component.
export default function SignUpForm() {
  const [step, setStep] = useState(STEPS.EmailUsername);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      username: '',
      fullname: '',
      image: '',
      website: '',
      location: null,
      bio: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleNext = () => setStep((value) => ++value);
  const handleBack = () => setStep((value) => --value);

  const usernameEmailStepClean = useCallback(
    (data: FieldValues) => {
      if (!isValidEmail(data.email)) {
        setError('email', { message: 'Invalid email address.' });
        toast.error('Invalid email address.');
        return false;
      }

      if (!isValidUsername(data.username)) {
        setError('username', { message: 'Invalid username.' });
        toast.error('Invalid username.');
        return false;
      }

      return true;
    },
    [setError]
  );

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    console.log(data);

    if (step === STEPS.EmailUsername)
      if (usernameEmailStepClean(data)) handleNext();
      else return;

    console.log('User created!');
  };

  let bodyContent = (
    <>
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
        disabled={isLoading || isSubmitting}
      />
      <Input
        id="username"
        label="Username"
        register={register}
        errors={errors}
        required
        disabled={isLoading || isSubmitting}
      />
    </>
  );

  return (
    <form className="w-full flex flex-col items-center gap-4">
      {bodyContent}

      <div className="w-full flex flex-row items-center gap-2 mt-8">
        {step !== STEPS.EmailUsername && (
          <Button label="Back" onClick={handleBack} icon={FaArrowCircleLeft} outline />
        )}

        <Button
          label={step !== STEPS.Password ? 'Next' : 'Sign Up'}
          onClick={handleSubmit(onSubmit)}
          icon={FaArrowCircleRight}
          iconSide="right"
        />
      </div>
    </form>
  );
}
