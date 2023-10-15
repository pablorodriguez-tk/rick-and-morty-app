'use client';

import { useQuery } from '@apollo/client';
import type { ICharactersResponse } from './interfaces/characters';
import { GET_CHARACTERS } from './services/graphql/query/getCaracters';

export default function Home() {
  const { data: characterList1 } =
    useQuery<ICharactersResponse>(GET_CHARACTERS);

  const { data: characterList2 } =
    useQuery<ICharactersResponse>(GET_CHARACTERS);

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="flex w-1/2">
        {JSON.stringify(characterList1, null, 2)}
      </div>
      <div className="flex w-1/2">
        {JSON.stringify(characterList2, null, 2)}
      </div>
    </main>
  );
}
