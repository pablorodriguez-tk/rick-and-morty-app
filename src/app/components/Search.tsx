'use client';

import type { ChangeEvent } from 'react';
import InputText from './InputText';

interface SearchProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  initialValue?: string;
}

const Search = ({ onChange, initialValue }: SearchProps) => {
  return (
    <form
      className="flex flex-col justify-center gap-2 w-full lg:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputText
        name="name"
        initialValue={initialValue}
        label="Character name"
        onChange={(e) => {
          onChange?.(e);
        }}
      />
    </form>
  );
};
export default Search;
