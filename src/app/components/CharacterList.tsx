'use client';

import type { ICharacters } from '../interfaces/characters';
import CharacterCard from './CharacterCard';
import SkeletonCard from './SkeletonCard';

interface CharacterListProps {
  characters: ICharacters[] | undefined;
  selectedCharacterId: string | undefined;
  onClick: (character: ICharacters) => void;
  loading?: boolean;
}

const CharacterList = ({
  characters,
  selectedCharacterId,
  onClick,
  loading,
}: CharacterListProps) => {
  if (loading) {
    return (
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 overflow-auto m-2 gap-1">
        {Array.from({ length: 20 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (characters?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-2xl text-gray-700 dark:text-gray-300">
          No results found :(
        </h1>
        <p>Try again</p>
      </div>
    );
  }

  return (
    <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 overflow-auto m-2 gap-1">
      {characters?.map((character) => (
        <CharacterCard
          character={character}
          selectedCharacterId={selectedCharacterId}
          key={character.id}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
export default CharacterList;
