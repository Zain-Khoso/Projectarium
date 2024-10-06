'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

// Icons.
import { FaArrowCircleLeft, FaArrowCircleRight, FaCheckCircle } from 'react-icons/fa';

// Utils.
import { isValidURL, isValidUsername } from '@/libs/validations';
import { formatURL } from '@/libs/formatters';

// Components.
import Modal from './base';
import Heading from '../Heading';
import { Input, Textarea, ImageUpload } from '../Input';
import TechnologiesSelect from '../Input/TechnologiesSelect';
import ProjectStatusSelect from '../Input/ProjectStatusSelect';

// Types.
import { Project } from '@prisma/client';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
};
enum STEPS {
  IMAGE_TITLE = 0,
  STATUS_DESCRIPTION = 1,
  TECHNOLOGIES_LIVEDEMO_REPO = 2,
}

// Component.
export default function EditProjectModal({ isOpen, onClose, project }: Props) {
  const router = useRouter();

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
      title: project.title,
      coverImage: project.coverImage,
      description: project.description,
      technologies: project.technologies,
      status: project.status,
      liveDemo: project.liveDemo,
      repositoryUrl: project.repositoryUrl,
    },
  });

  const title = watch('title');
  const description = watch('description');
  const liveDemo = watch('liveDemo');
  const technologies = watch('technologies');
  const status = watch('status');
  const repositoryUrl = watch('repositoryUrl');

  const [step, setStep] = useState(STEPS.IMAGE_TITLE);

  useEffect(() => {
    setValue('title', project?.title || '');
    setValue('coverImage', project?.coverImage || '');
    setValue('description', project?.description || '');
    setValue('liveDemo', project?.liveDemo || '');
    setValue('repositoryUrl', project?.repositoryUrl || '');
    setValue('technologies', project?.technologies || '');
    setValue('status', project?.status || '');
  }, [isOpen]);

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
    const { title, coverImage, description, technologies, status, liveDemo, repositoryUrl } = data;

    if (step === STEPS.IMAGE_TITLE) {
      // CoverImage checks.
      if (coverImage.length === 0) {
        setError('coverImage', { message: 'Cover Image is required.' });
        toast.error('Cover Image is required.');
        return;
      }

      // Title checks.
      if (title.length === 0) {
        setError('title', { message: 'Title is required.' });
        toast.error('Title is required.');
        return;
      } else if (title.length > 30) {
        setError('title', { message: 'Title is too long.' });
        toast.error('Title is too long.');
        return;
      } else if (!isValidUsername(title)) {
        setError('title', { message: 'Invalid Title.' });
        toast.error('Invalid Title.');
        return;
      } else if (project.title.toLowerCase() !== title.toLowerCase()) {
        try {
          const response = await axios.post('/api/projects/title-is-unique', {
            title,
          });

          if (!response.data.isClear) {
            setError('title', { message: 'Title is already in use.' });
            toast.error('Title is already in use.');
            return;
          }
        } catch {
          toast.error('Something went wrong.');
          return;
        }
      }

      return onNext();
    }

    if (step === STEPS.STATUS_DESCRIPTION) {
      // Status checks.
      if (status === '') {
        setError('status', { message: 'Status is required.' });
        toast.error('Status is required.');
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

      return onNext();
    }

    if (step === STEPS.TECHNOLOGIES_LIVEDEMO_REPO) {
      // Technologies checks.
      if (technologies.length === 0) {
        setError('technologies', { message: 'Provide at least one technology.' });
        toast.error('Provide at least one technology.');
        return;
      }

      // Demo.
      if (liveDemo !== '' && !isValidURL(liveDemo)) {
        setError('liveDemo', { message: 'Invalid URL.' });
        toast.error('Invalid URL.');
        return;
      }

      // Repository.
      if (repositoryUrl !== '' && !isValidURL(repositoryUrl)) {
        setError('repositoryUrl', { message: 'Invalid URL.' });
        toast.error('Invalid URL.');
        return;
      }
    }

    const projectData = {
      title,
      description,
      coverImage,
      technologies,
      status,
      liveDemo,
      repositoryUrl,
    };

    try {
      const response = await axios.post(`/api/projects/update/${project.id}`, projectData);
      toast.success('Project updated successfully.');
      router.replace(response.data.redirectUrl);
      handleClose();
    } catch {
      toast.error('Something went wrong.');
      toast.error('Try again later.');
      return;
    }
  };

  const handleClose = function () {
    reset();
    setStep(STEPS.IMAGE_TITLE);
    onClose();
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Project Details"
        subtitle="Update your project's cover image and title to make a lasting impression."
      />

      <div className="flex flex-col gap-4">
        <Input
          id="title"
          label="Title"
          value={title}
          onChange={(value) => onInputChange('title', value)}
          errors={errors}
          required
        />

        <ImageUpload
          id="coverImage"
          label="Click to upload your Image"
          value={getValues('coverImage')}
          onChange={setValue}
        />
      </div>
    </div>
  );

  if (step === STEPS.STATUS_DESCRIPTION)
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Project Overview"
          subtitle="Refine your project's status and description to reflect your progress and vision."
        />

        <div className="flex flex-col gap-4">
          <ProjectStatusSelect
            value={status}
            onChange={setValue}
            errors={errors}
            clearErrors={clearErrors}
          />

          <Textarea
            id="description"
            label="Description"
            value={description}
            onChange={(value) => onInputChange('description', value)}
            errors={errors}
          />
        </div>
      </div>
    );

  if (step === STEPS.TECHNOLOGIES_LIVEDEMO_REPO)
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Technical Details"
          subtitle="Specify the technologies, live demo, and repository to showcase your project's implementation and source."
        />

        <div className="flex flex-col gap-4">
          <TechnologiesSelect
            value={technologies}
            onChange={setValue}
            errors={errors}
            clearErrors={clearErrors}
          />

          <Input
            id="liveDemo"
            label="Project Demo"
            value={liveDemo}
            onChange={(value) => onInputChange('liveDemo', value)}
            errors={errors}
            disabled={isLoading || isSubmitting}
          />

          <Input
            id="repositoryUrl"
            label="Project Repository"
            value={repositoryUrl}
            onChange={(value) => onInputChange('repositoryUrl', value)}
            errors={errors}
            disabled={isLoading || isSubmitting}
          />
        </div>
      </div>
    );

  return (
    <Modal
      title={`Edit ${project.title}`}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={onBack}
      actionLabel={step === STEPS.TECHNOLOGIES_LIVEDEMO_REPO ? 'Confirm' : 'Next'}
      actionIcon={step === STEPS.TECHNOLOGIES_LIVEDEMO_REPO ? FaCheckCircle : FaArrowCircleRight}
      secondaryActionLabel={step === STEPS.IMAGE_TITLE ? undefined : 'Back'}
      secondaryActionIcon={FaArrowCircleLeft}
      body={bodyContent}
      disabled={isSubmitting || isLoading}
    />
  );
}
