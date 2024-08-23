'use client';

// Lib Imports.
import { useState } from 'react';

// Icons.
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

// Types.
import { FieldErrors } from 'react-hook-form';
type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
};

// Component.
export default function Password({
  id,
  label,
  value,
  onChange,
  disabled,
  required,
  errors,
}: Props) {
  const [show, setShow] = useState(false);

  const handleChange: React.ReactEventHandler = function (event) {
    event.preventDefault();

    onChange((event.target as HTMLInputElement).value);
  };

  return (
    <label
      className={`
        relative flex flex-row items-center gap-2 w-full border-2 border-neutral-200 p-3 pt-4 rounded-md 
        focus-within:border-black 
        ${errors[id] ? 'border-rose-500' : 'border-neutral-200'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
    >
      <input
        id={id}
        type={show ? 'text' : 'password'}
        placeholder=" "
        value={value}
        onChange={handleChange}
        required={required}
        className={`flex-1 peer text-lg outline-none ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      />

      <button type="button" onClick={() => setShow((value) => !value)}>
        {show ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>

      <label
        htmlFor={id}
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
