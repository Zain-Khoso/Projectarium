'use client';

// Lib Imports.
import Select from 'react-select';

// Hooks.
import useCountries from '@/hooks/useCountries';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

// Types.
export type CountrySelectionValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};
type Props = {
  value?: CountrySelectionValue;
  onChange: UseFormSetValue<FieldValues>;
};

export default function CountrySelect({ value, onChange }: Props) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value: CountrySelectionValue) => onChange('location', value)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},<span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
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
    </div>
  );
}
