'use client';

import { useLazyQuery, useQuery } from '@apollo/client';
import { useGlobalContext } from './context/store';
import { GET_CHARACTERS } from './services/graphql/query/getCaracters';
import { GET_CHARACTER } from './services/graphql/query/getCharacter';
import Title from './components/Title';
import CharacterList from './components/CharacterList';
import type { ICharacters, ICharactersResponse } from './interfaces/characters';
import type { ICharacterResponse } from './interfaces/character';
import EpisodeTable from './components/EpisodeTable';
import { useMemo } from 'react';
import FloatingButton from './components/FloatingButton';
import ArrowUpIcon from './svg/ArrowUpIcon';
import ModalCharacterOnEpisodes from './components/ModalCharacterOnEpisodes';
import useGetEpisode from './hooks/useGetEpisode';

export default function Home() {
  const { selectedCharacters, setSelectedCharacters } = useGlobalContext();
  const { openModal, setOpenModal, charactersInEpisode, onClickGetEpisode } =
    useGetEpisode();

  const { data: characterList1, loading: characterList1Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); // TODO: Add pagination and filter by name

  const { data: characterList2, loading: characterList2Loading } =
    useQuery<ICharactersResponse>(GET_CHARACTERS); // TODO: Add pagination and filter by name

  const [getCharacterEpisodes1, { data: episodesList1 }] =
    useLazyQuery<ICharacterResponse>(GET_CHARACTER, {
      variables: { characterId: selectedCharacters.character1?.id },
    });

  const [getCharacterEpisodes2, { data: episodesList2 }] =
    useLazyQuery<ICharacterResponse>(GET_CHARACTER, {
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

  const sharedEpisodes = useMemo(() => {
    return episodesList1?.character.episode.filter((episode) => {
      return episodesList2?.character.episode.some((episode2) => {
        return episode.id === episode2.id;
      });
    });
  }, [episodesList1?.character.episode, episodesList2?.character.episode]);

  const showList =
    episodesList1?.character.episode &&
    episodesList2?.character.episode &&
    sharedEpisodes;

  return (
    <main
      className={`${
        selectedCharacters.character1 !== null &&
        selectedCharacters.character2 !== null
          ? 'h-screen'
          : 'h-full'
      }`}
    >
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
      <ModalCharacterOnEpisodes
        open={openModal}
        setOpenModal={setOpenModal}
        characters={charactersInEpisode}
      />
      {showList && (
        <>
          <div className="flex flex-row h-1/3 w-full p-4 gap-3">
            <EpisodeTable
              episodeList={episodesList1?.character.episode}
              title={selectedCharacters?.character1?.name}
              secondaryTitle="Only Episodes"
              onClick={onClickGetEpisode}
            />
            <EpisodeTable
              episodeList={sharedEpisodes}
              title={`${selectedCharacters?.character1?.name} & ${selectedCharacters?.character2?.name}`}
              secondaryTitle="Shared Episodes"
              onClick={onClickGetEpisode}
            />
            <EpisodeTable
              episodeList={episodesList2?.character.episode}
              title={selectedCharacters?.character2?.name}
              secondaryTitle="Only Episodes"
              onClick={onClickGetEpisode}
            />
          </div>
        </>
      )}
      <FloatingButton
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        icon={<ArrowUpIcon />}
      />
    </main>
  );
}
