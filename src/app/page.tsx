'use client';

import { useLazyQuery, useQuery } from '@apollo/client';
import { useGlobalContext } from './context/store';
import { GET_CHARACTERS } from './services/graphql/query/getCaracters';
import { GET_CHARACTER } from './services/graphql/query/getCharacter';
import Title from './components/Title';
import CharacterList from './components/CharacterList';
import type { ICharacters, ICharactersResponse } from './interfaces/characters';
import type { ICharacter } from './interfaces/character';

export default function Home() {
  const { selectedCharacters, setSelectedCharacters } = useGlobalContext();

  const { data: characterList1, loading: characterList1Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); //TODO: Add pagination and filter by name

  const { data: characterList2, loading: characterList2Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); //TODO: Add pagination and filter by name

  const [getCharacterEpisodes1, { data: episodesList1 }] =
    useLazyQuery<ICharacter>(GET_CHARACTER, {
      variables: { characterId: selectedCharacters.character1?.id },
    });

  const [getCharacterEpisodes2, { data: episodesList2 }] =
    useLazyQuery<ICharacter>(GET_CHARACTER, {
      variables: { characterId: selectedCharacters.character1?.id },
    });

  const onCharacter1Click = (character: ICharacters) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      character1: character,
    }));
    getCharacterEpisodes1({
      variables: {
        characterId: character.id,
      },
    });
  };

  const onCharacter2Click = (character: ICharacters) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      character2: character,
    }));
    getCharacterEpisodes2({
      variables: {
        characterId: character.id,
      },
    });
  };

  return (
    <main className="">
      <div className="flex flex-row h-2/3">
        <div className="flex flex-col w-1/2 p-4">
          <Title
            title={selectedCharacters?.character1?.name ?? 'Character #1'}
            position="left"
          />
          <CharacterList
            characters={characterList1?.characters.results}
            loading={characterList1Loading}
            onClick={onCharacter1Click}
            selectedCharacterId={selectedCharacters.character1?.id}
          />
        </div>
        <div className="flex flex-col w-1/2 p-4">
          <Title
            title={selectedCharacters?.character2?.name ?? 'Character #2'}
            position="right"
          />
          <CharacterList
            characters={characterList2?.characters.results}
            loading={characterList2Loading}
            onClick={onCharacter2Click}
            selectedCharacterId={selectedCharacters.character2?.id}
          />
        </div>
      </div>
      {/* TODO: Add episodes list */}
      {JSON.stringify(episodesList1, null, 2)}
      <div>----------------</div>
      {JSON.stringify(episodesList2, null, 2)}
    </main>
  );
}
