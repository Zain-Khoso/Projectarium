'use client';

// Lib Imports.
import { useState } from 'react';

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

  const handleNext = () => setStep((value) => ++value);
  const handleBack = () => setStep((value) => --value);

  const onSubmit = function () {
    if (step !== STEPS.Password) return handleNext();

    console.log('User created!');
  };

  let bodyContent = (
    <>
      <Input label="Email" type="email" />
      <Input label="Username" type="text" />
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
          onClick={onSubmit}
          icon={FaArrowCircleRight}
          iconSide="right"
        />
      </div>
    </form>
  );
}
