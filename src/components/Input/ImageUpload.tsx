'use client';

// Lib Imports.
import Image from 'next/image';
import { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

// Icons.
import { TbPhotoPlus } from 'react-icons/tb';
import { FieldErrors, FieldValues, UseFormSetValue } from 'react-hook-form';

// Types.
declare global {
  var cloudinary: any;
}
type Props = {
  id: string;
  label: string;
  value: string;
  onChange: UseFormSetValue<FieldValues>;
  errors?: FieldErrors;
};

// Component.
export default function ImageUpload({ id, label, value, onChange, errors }: Props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(id, result.info.secure_url);
    },
    [id, onChange]
  );

  return (
    <CldUploadWidget onSuccess={handleUpload} uploadPreset="clvmvabd" options={{ maxFiles: 1 }}>
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`w-full relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 ${errors?.id ? 'border-rose-500' : 'border-neutral-200'} flex flex-col justify-center items-center gap-4 text-neutral-600`}
          >
            <TbPhotoPlus className={errors?.id ? 'text-rose-500' : 'text-neutral-500'} size={50} />

            <div
              className={`font-semibold text-lg text-pretty text-center ${errors?.id ? 'text-rose-500' : 'text-neutral-500'}`}
            >
              {label}
            </div>

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image alt="Upload" fill style={{ objectFit: 'cover' }} src={value} />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
