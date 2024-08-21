'use client';

// Types.
import { FieldErrors } from 'react-hook-form';
type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
};

// Component.
export default function Textarea({
  id,
  label,
  value,
  onChange,
  rows,
  disabled,
  required,
  errors,
}: Props) {
  const handleChange: React.ReactEventHandler = function (event) {
    event.preventDefault();

    onChange((event.target as HTMLTextAreaElement).value);
  };

  return (
    <label
      className={`
        relative w-full border-2 border-neutral-200 p-3 pt-4 rounded-md 
        focus-within:border-black 
        ${errors[id] ? 'border-rose-500' : 'border-neutral-200'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
    >
      <textarea
        id={id}
        placeholder=" "
        rows={rows ? rows : 4}
        value={value}
        onChange={handleChange}
        required={required}
        className={`w-full peer text-lg outline-none resize-none 
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      />

      <label
        htmlFor={id}
        className={`
          absolute 
          bg-white 
          font-semibold
          px-1 
          rounded-sm 
          top-6
          left-[12px]
          -translate-y-[150%] 
          peer-placeholder-shown:text-neutral-400
          peer-placeholder-shown:-translate-y-1/2 
          peer-focus:-translate-y-[150%] 
          peer-focus:text-neutral-800
          transition
          ${errors[id] && 'text-rose-500 peer-placeholder-shown:text-rose-500'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
      >
        {label}
      </label>
    </label>
  );
}
