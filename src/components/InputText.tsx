'use client';

import { useRef } from 'react';

interface InputProps {
  name: string;
  label: string;
  initialValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({ name, label, onChange, initialValue }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        name={name}
        onChange={onChange}
        value={initialValue}
      />
      <label
        onClick={handleClick}
        className="absolute text-sm hover:cursor-text text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
};
export default InputText;
