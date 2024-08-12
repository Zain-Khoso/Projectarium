'use client';

// Types.
type Props = {
  label: string;
  type: 'text' | 'email' | 'url';
  disabled?: boolean;
};

// Component.
export default function Input({ label, type, disabled }: Props) {
  return (
    <label
      className={`relative w-full border-2 border-neutral-200 p-3 pt-4 rounded-md focus-within:border-black ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <input
        type="text"
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
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {label}
      </label>
    </label>
  );
}
