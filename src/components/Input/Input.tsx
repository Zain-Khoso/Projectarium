'use client';

// Lib Imports.
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

// Types.
type Props = {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

// Component.
export default function Input({ id, label, disabled, required, register, errors }: Props) {
  return (
    <label
      className={`
        relative w-full border-2 border-neutral-200 p-3 pt-4 rounded-md 
        focus-within:border-black 
        ${errors[id] ? 'border-rose-500' : 'border-neutral-200'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
    >
      <input
        type="text"
        {...register(id, { required, disabled })}
        placeholder=" "
        className={`w-full peer text-lg outline-none ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      />

      <label
        htmlFor=""
        className={`
          absolute 
          bg-white 
          font-semibold
          px-1 
          rounded-lg 
          top-1/2
          left-[12px]
          -translate-y-[170%] 
          peer-placeholder-shown:text-neutral-400
          peer-placeholder-shown:-translate-y-1/2 
          peer-focus:-translate-y-[170%] 
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
