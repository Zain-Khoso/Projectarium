'use client';

// Lib Imports.
import { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';

// Hooks.
import { FieldValues, UseFormSetValue } from 'react-hook-form';

// Types.
type Props = {
  value?: ProjectStatus;
  onChange: UseFormSetValue<FieldValues>;
};
type ProjectStatus = {
  label: string;
  value: string;
};

export default function ProjectStatusSelect({ value, onChange }: Props) {
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

  return (
    <div className="w-full">
      {isMounted && (
        <Select
          id="status"
          placeholder="Idea..."
          isClearable
          options={statuses}
          value={value}
          onChange={(value: ProjectStatus) => onChange('status', value)}
          formatOptionLabel={(option: any) => (
            <div className="flex flex-row items-center gap-3">{option.label}</div>
          )}
          classNames={{
            container: () => '',
            control: () => 'p-3 border-2',
            input: () => 'text-lg',
            option: () => 'text-lg',
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
