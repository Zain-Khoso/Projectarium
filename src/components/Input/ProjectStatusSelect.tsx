'use client';

// Lib Imports.
import { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';

// Hooks.
import { FieldErrors, FieldValues, UseFormClearErrors, UseFormSetValue } from 'react-hook-form';

// Types.
type Props = {
  value?: ProjectStatus;
  onChange: UseFormSetValue<FieldValues>;
  errors: FieldErrors;
  clearErrors: UseFormClearErrors<FieldValues>;
};
type ProjectStatus = {
  label: string;
  value: string;
};

export default function ProjectStatusSelect({ value, onChange, errors, clearErrors }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const statuses = useMemo(
    () => [
      { label: 'Idea', value: 'IDEA' },
      { label: 'In Development', value: 'IN_DEVELOPMENT' },
      { label: 'Completed', value: 'COMPLETED' },
      { label: 'Archived', value: 'ARCHIVED' },
    ],
    []
  );

  const handleChange = function (value: ProjectStatus) {
    onChange('status', value);
    clearErrors('status');
  };

  return (
    <div className="w-full">
      {isMounted && (
        <Select
          id="status"
          placeholder="Project Status"
          isClearable
          options={statuses}
          value={value}
          onChange={handleChange}
          formatOptionLabel={(option: any) => (
            <div className="flex flex-row items-center gap-3">{option.label}</div>
          )}
          classNames={{
            control: () =>
              `p-3 !border-2 ${errors['status'] ? '!border-rose-500' : '!border-neutral-200'}`,
            input: () => 'text-lg',
            option: () => 'text-lg',
            placeholder: () =>
              `font-semibold ${errors['status'] ? '!text-rose-500' : '!text-neutral-400'}`,
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: '#e0f2fe',
            },
          })}
        />
      )}
    </div>
  );
}
