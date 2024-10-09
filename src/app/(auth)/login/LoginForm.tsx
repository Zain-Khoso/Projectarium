'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

// Icons.
import { RiLoginCircleFill } from 'react-icons/ri';

// Utils.
import { isValidEmail } from '@/libs/validations';

// Components.
import { Button } from '@/components/Button';
import { Input, Password } from '@/components/Input';

// Component.
export default function LoginForm() {
  const router = useRouter();

  const {
    watch,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = watch('email');
  const password = watch('password');

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    const { email, password } = data;

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

    if (password.length < 8) {
      setError('password', { message: 'Password is required.' });
      toast.error('Invalid passwrod.');
      return;
    }

    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      if (callback?.ok) {
        toast.success('Logged in');
        router.push('/');
      }

      if (callback?.error) toast.error(callback.error);
    });
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
        label="Email *"
        value={email}
        onChange={(value) => onInputChange('email', value)}
        errors={errors}
        required
        disabled={isLoading || isSubmitting}
      />

      <Password
        id="password"
        label="Password *"
        value={password}
        onChange={(value) => onInputChange('password', value)}
        errors={errors}
        required
        disabled={isLoading || isSubmitting}
      />

      <Button
        type="submit"
        label="Login"
        onClick={handleSubmit(onSubmit)}
        icon={RiLoginCircleFill}
        iconSide="right"
        disabled={isLoading || isSubmitting}
      />

      <span className="text-sm text-neutral-500 font-light">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold text-sky-500">
          Sign Up
        </Link>
        .
      </span>
    </form>
  );
}
