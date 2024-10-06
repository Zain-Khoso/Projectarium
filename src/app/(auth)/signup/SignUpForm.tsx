'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

// Utils.
import { isValidEmail, isValidUsername } from '@/libs/validations';

// Components.
import { Button } from '@/components/Button';
import { Input, Password } from '@/components/Input';

// Icons.
import { FaUserPlus } from 'react-icons/fa';

// Component.
export default function SignUpForm() {
  const router = useRouter();

  const {
    watch,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const email = watch('email');
  const username = watch('username');
  const password = watch('password');

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    const { email, username, password } = data;

    if (!email) {
      setError('email', { message: 'Email is required.' });
      return toast.error('Email is required.');
    }
    if (!isValidEmail(email)) {
      setError('email', { message: 'Invalid email.' });
      return toast.error('Invalid email.');
    }

    if (!username) {
      setError('username', { message: 'Username is required.' });
      return toast.error('Username is required.');
    }
    if (!isValidUsername(username)) {
      setError('username', { message: 'Invalid username.' });
      return toast.error('Invalid username.');
    }

    if (password.length < 8) {
      setError('password', { message: 'Password is required.' });
      return toast.error('Password requires atleast 8 characters.');
    }

    axios
      .post('/api/auth/signup', data)
      .then((data) => {
        if (!data.data?.errorField) {
          reset();
          toast.success('Account created successfully.');
          router.push('/login');
          return;
        }

        setError(data.data.errorField, { message: `${data.data.errorField} already in use.` });
        toast.error(`${data.data.errorField} already in use.`);
      })
      .catch(() => toast.error('Signup Failed.'));
  };

  const onInputChange = useCallback(
    (id: string, value: string) => {
      setValue(id, value);

      clearErrors(id);
    },
    [setValue, clearErrors]
  );

  return (
    <form className="w-full flex flex-col items-center gap-4">
      <Input
        id="email"
        label="Email"
        value={email}
        onChange={(value) => onInputChange('email', value)}
        errors={errors}
        required
        disabled={isLoading || isSubmitting}
      />

      <Input
        id="username"
        label="Username"
        value={username}
        onChange={(value) => onInputChange('username', value)}
        errors={errors}
        required
        disabled={isLoading || isSubmitting}
      />

      <Password
        id="password"
        label="Password"
        value={password}
        onChange={(value) => onInputChange('password', value)}
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
        disabled={isLoading || isSubmitting}
      />

      <span className="text-sm text-neutral-500 font-light">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-sky-500">
          Login
        </Link>
        .
      </span>
    </form>
  );
}
