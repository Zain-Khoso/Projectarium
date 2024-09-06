'use client';

// Lib Imports.
import { useCallback } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

// Icons.
import { FaPlusCircle } from 'react-icons/fa';

// Components.
import { Input, Textarea, ImageUpload } from '@/components/Input';
import { Button } from '@/components/Button';
import ProjectStatusSelect from '@/components/Input/ProjectStatusSelect';
import TechnologiesSelect from '@/components/Input/TechnologiesSelect';

// Component.
export default function ShareProjectForm() {
  const {
    watch,
    setError,
    clearErrors,
    setValue,
    getValues,
    handleSubmit,
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

  const onSubmit: SubmitHandler<FieldValues> = async function (data) {
    console.log(data);
  };

  const handleInputChange = useCallback(
    (id: string, value: string) => {
      setValue(id, value);
      clearErrors(id);
    },
    [setValue, clearErrors]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-sm mt-8 md:mt-16 flex flex-col items-start gap-4 md:gap-8"
    >
      {/* Title */}
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(value) => handleInputChange('title', value)}
        errors={errors}
        disabled={isLoading || isSubmitting}
      />

      {/* Description */}
      <Textarea
        id="description"
        label="Tell us about the project in detail"
        value={description}
        onChange={(value) => handleInputChange('description', value)}
        errors={errors}
        disabled={isLoading || isSubmitting}
      />

      {/* Technologies */}
      <TechnologiesSelect value={technologies} onChange={setValue} errors={errors} />

      {/* Status */}
      <ProjectStatusSelect value={status} onChange={setValue} errors={errors} />

      {/* Cover Image */}
      <ImageUpload
        id="coverImage"
        label="Click to upload Project Looks!"
        value={getValues('coverImage')}
        onChange={setValue}
        errors={errors}
      />

      <section className="w-full flex items-end">
        <Button
          type="submit"
          label="Share Project"
          icon={FaPlusCircle}
          iconSide="right"
          onClick={() => {}}
          disabled={isLoading || isSubmitting}
        />
      </section>
    </form>
  );
}
