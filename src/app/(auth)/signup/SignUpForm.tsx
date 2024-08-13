'use client';

// Lib Imports.
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

// Local Imports.
import { isValidEmail, isValidUsername } from '@/libs/validations';

// Components.
import { Button } from '@/components/Button';
import { Input, Password } from '@/components/Input';

// Icons.
import { FaUserPlus } from 'react-icons/fa';

// Component.
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    const { email, username, password } = data;

    if (!email) {
      setError('email', { message: 'Email is required.' });
      toast.error('Email is required.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('email', { message: 'Invalid email.' });
      toast.error('Invalid email.');
      return;
    }

    if (username.length < 4) {
      setError('username', { message: 'Username is required.' });
      toast.error('Username requires atleast 4 characters.');
      return;
    }
    if (!isValidUsername(username)) {
      setError('username', { message: 'Invalid username.' });
      toast.error('Invalid username.');
      return;
    }

    if (password.length < 8) {
      setError('password', { message: 'Password is required.' });
      toast.error('Password requires atleast 8 characters.');
      return;
    }
  };

  return (
    <form className="w-full flex flex-col items-center gap-4">
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

      <Password
        id="password"
        label="Password"
        register={register}
        errors={errors}
        required
        disabled={isLoading || isSubmitting}
      />

      <Button
        type="submit"
        label="Sign Up"
        onClick={handleSubmit(onSubmit)}
        icon={FaUserPlus}
        iconSide="right"
      />
    </form>
  );
}
