'use client';

import { useQuery } from '@apollo/client';
import type { ICharacters, ICharactersResponse } from './interfaces/characters';
import { GET_CHARACTERS } from './services/graphql/query/getCaracters';
import CharacterList from './components/CharacterList';
import { useGlobalContext } from './context/store';

export default function Home() {
  const { selectedCharacters, setSelectedCharacters } = useGlobalContext();

  const { data: characterList1, loading: characterList1Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); //TODO: Add pagination and filter by name

  const { data: characterList2, loading: characterList2Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); //TODO: Add pagination and filter by name

  const onCharacter1Click = (character: ICharacters) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      character1: character,
    }));
  };

  const onCharacter2Click = (character: ICharacters) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      character2: character,
    }));
  };
  console.log(selectedCharacters);
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <CharacterList
        characters={characterList1?.characters.results}
        loading={characterList1Loading}
        onClick={onCharacter1Click}
        selectedCharacterId={selectedCharacters.character1?.id}
      />
      <CharacterList
        characters={characterList2?.characters.results}
        loading={characterList2Loading}
        onClick={onCharacter2Click}
        selectedCharacterId={selectedCharacters.character2?.id}
      />
    </main>
  );
}
