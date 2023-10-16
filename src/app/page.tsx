'use client';

import { GET_CHARACTER } from './services/graphql/query/getCharacter';
import { Button, Pagination } from 'flowbite-react';
import { useGlobalContext } from './context/store';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import ArrowUpIcon from './svg/ArrowUpIcon';
import CharacterList from './components/CharacterList';
import EpisodeTable from './components/EpisodeTable';
import FloatingButton from './components/FloatingButton';
import ModalCharacterOnEpisodes from './components/ModalCharacterOnEpisodes';
import Search from './components/Search';
import Title from './components/Title';
import type { ICharacterResponse } from './interfaces/character';
import type { ICharacters } from './interfaces/characters';
import useGetCharacters from './hooks/useGetCharacters';
import useGetEpisode from './hooks/useGetEpisode';
import ExcelGenerator from './components/ExcelGenerator';

export default function Home() {
  const { selectedCharacters, setSelectedCharacters } = useGlobalContext();
  const { openModal, setOpenModal, charactersInEpisode, onClickGetEpisode } =
    useGetEpisode();
  const {
    data: characterList1,
    loading: characterList1Loading,
    page: page1,
    search: search1,
    setSearch: setSearch1,
    setPage: setPage1,
  } = useGetCharacters();

  const {
    data: characterList2,
    loading: characterList2Loading,
    page: page2,
    search: search2,
    setSearch: setSearch2,
    setPage: setPage2,
  } = useGetCharacters();

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
    selectedCharacters.character1?.id &&
    selectedCharacters.character2?.id &&
    episodesList1?.character.episode &&
    episodesList2?.character.episode &&
    sharedEpisodes;

  const onResetButtonClick = () => {
    setSelectedCharacters({
      character1: null,
      character2: null,
    });
    setSearch1('');
    setSearch2('');
    setPage1(1);
    setPage2(1);
  };

  useEffect(() => {
    if (
      selectedCharacters.character1 !== null &&
      selectedCharacters.character2 !== null
    ) {
      window.scrollTo(0, 0);
    }
  }, [selectedCharacters]);

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
          <Search
            initialValue={search1}
            onChange={(e) => {
              setSearch1(e.target.value);
              setPage1(1);
            }}
          />
          <CharacterList
            characters={characterList1?.characters.results}
            loading={characterList1Loading}
            onClick={onCharacter1Click}
            selectedCharacterId={selectedCharacters.character1?.id}
          />
          <div className="flex items-center justify-center text-center">
            <Pagination
              currentPage={page1}
              totalPages={characterList1?.characters.info.pages ?? 0}
              onPageChange={(page) => {
                setPage1(page);
              }}
              layout="table"
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2 p-4">
          <Title
            title={selectedCharacters?.character2?.name ?? 'Character #2'}
            position="right"
          />
          <Search
            initialValue={search2}
            onChange={(e) => {
              setSearch2(e.target.value);
              setPage2(1);
            }}
          />
          <CharacterList
            characters={characterList2?.characters.results}
            loading={characterList2Loading}
            onClick={onCharacter2Click}
            selectedCharacterId={selectedCharacters.character2?.id}
          />
          <div className="flex items-center justify-center text-center">
            <Pagination
              currentPage={page2}
              totalPages={characterList2?.characters.info.pages ?? 0}
              onPageChange={(page) => {
                setPage2(page);
              }}
              layout="table"
            />
          </div>
        </div>
      </div>
      <ModalCharacterOnEpisodes
        open={openModal}
        setOpenModal={setOpenModal}
        characters={charactersInEpisode}
      />
      {showList && (
        <>
          <div className="flex justify-center">
            <ExcelGenerator
              data={[
                episodesList1?.character.episode ?? [],
                sharedEpisodes ?? [],
                episodesList2?.character.episode ?? [],
              ]}
              fileName={`${selectedCharacters.character1?.name}_&_${selectedCharacters.character2?.name}`}
              sheetName={[
                selectedCharacters.character1?.name,
                selectedCharacters.character1?.name +
                  ' & ' +
                  selectedCharacters.character1?.name,
                selectedCharacters.character2?.name,
              ]}
            />
          </div>
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
        className="text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        icon={<ArrowUpIcon />}
      />
      <Button
        gradientDuoTone="greenToBlue"
        outline
        className="absolute top-4 left-1/2 transform -translate-x-1/2"
        onClick={onResetButtonClick}
      >
        <p>Reset</p>
      </Button>
    </main>
  );
}
