'use client';

import { useQuery } from '@apollo/client';
import type { ICharactersResponse } from './interfaces/characters';
import { GET_CHARACTERS } from './services/graphql/query/getCaracters';
import CharacterList from './components/CharacterList';

export default function Home() {
  const { data: characterList1, loading: characterList1Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); //TODO: Add pagination and filter by name

  const { data: characterList2, loading: characterList2Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); //TODO: Add pagination and filter by name

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <CharacterList
        characters={characterList1?.characters.results}
        loading={characterList1Loading}
        onClick={(character) => {
          console.log(character); //TODO: onClick function
        }}
        selectedCharacterId={'1'} //TODO: change this to a dynamic value
      />
      <CharacterList
        characters={characterList2?.characters.results}
        loading={characterList2Loading}
        onClick={(character) => {
          console.log(character); //TODO: onClick function
        }}
        selectedCharacterId={'2'} //TODO: change this to a dynamic value
      />
    </main>
  );
}
