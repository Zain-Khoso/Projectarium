'use client';

// Lib Imports.
import { useCallback } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

// Icons.
import { FaPlusCircle } from 'react-icons/fa';

// Components.
import { Input, Textarea, ImageUpload } from '@/components/Input';
import { Button } from '@/components/Button';
import ProjectStatusSelect from '@/components/Input/ProjectStatusSelect';
import TechnologiesSelect from '@/components/Input/TechnologiesSelect';
import { TechnologyT } from '@/hooks/useTechnologies';

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
    const { title, description, technologies, status, coverImage } = data;

    // Title checks.
    if (title.length === 0) {
      setError('title', { message: 'Title is required.' });
      toast.error('Title is required.');
      return;
    } else if (title.length > 30) {
      setError('title', { message: 'Title is too long.' });
      toast.error('Title is too long.');
      return;
    }

    // Description checks.
    if (description.length === 0) {
      setError('description', { message: 'Description is required.' });
      toast.error('Description is required.');
      return;
    } else if (description.length > 3000) {
      setError('description', { message: 'Description is too long.' });
      toast.error('Description is too long.');
      return;
    }

    // Technologies checks.
    if (technologies.length === 0) {
      setError('technologies', { message: 'Provide at least one technology.' });
      toast.error('Provide at least one technology.');
      return;
    }

    // Status checks.
    if (status === '') {
      setError('status', { message: 'Status is required.' });
      toast.error('Status is required.');
      return;
    }
    console.log(coverImage);
    // CoverImage checks.
    if (coverImage.length === 0) {
      setError('coverImage', { message: 'Cover Image is required.' });
      toast.error('Cover Image is required.');
      return;
    }

    const technologyValues = technologies.map((technology: TechnologyT) => technology.value);
    const statusValue = status.value;

    const newProjectData = {
      title,
      description,
      coverImage,
      technologies: technologyValues,
      status: statusValue,
    };

    console.log(newProjectData);
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
      <TechnologiesSelect
        value={technologies}
        onChange={setValue}
        errors={errors}
        clearErrors={clearErrors}
      />

      {/* Status */}
      <ProjectStatusSelect
        value={status}
        onChange={setValue}
        errors={errors}
        clearErrors={clearErrors}
      />

      {/* Cover Image */}
      <ImageUpload
        id="coverImage"
        label="Click to upload Project Looks!"
        value={getValues('coverImage')}
        onChange={setValue}
        errors={errors}
        clearErrors={clearErrors}
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
