'use client';

// Lib Imports.
import { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';

// Hooks.
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import useTechnologies from '@/hooks/useTechnologies';

// Types.
import { TechnologyT } from '@/hooks/useTechnologies';
type Props = {
  value?: string;
  onChange: UseFormSetValue<FieldValues>;
};

export default function TechnologiesSelect({ value, onChange }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const { getAll } = useTechnologies();

  return (
    <div className="w-full">
      {isMounted && (
        <Select
          id="technologies"
          placeholder="Something"
          isClearable
          isMulti
          options={getAll()}
          value={value}
          onChange={(value: any) => onChange('technologies', value)}
          formatOptionLabel={({ icon: Icon, label }: any) => (
            <div className="flex flex-row items-center gap-3">
              <div>
                <Icon />
              </div>
              <div>{label}</div>
            </div>
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
