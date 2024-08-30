'use client';

// Lib Imports.
import { useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

// Component.
export default function NewProjectForm() {
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
      title: '',
      coverImage: '',
      description: '',
      technologies: [],
      status: '',
    },
  });

  const title = watch('title');
  const description = watch('description');
  const technologies = watch('technologies');
  const status = watch('status');

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    console.log(data);
  };

  const onInputChange = useCallback(
    (id: string, value: string) => {
      setValue(id, value);

      clearErrors(id);
    },
    [setValue, clearErrors]
  );

  return <div>Form Here</div>;
}
