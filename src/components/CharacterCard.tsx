'use client';

import { Badge } from 'flowbite-react';
import type { ICharacters, IStatus } from '../interfaces/characters';
import Image from 'next/image';

interface CharacterCardProps {
  character: ICharacters;
  selectedCharacterId: string | undefined;
  onClick: (character: ICharacters) => void;
}

const CharacterCard = ({
  character,
  onClick,
  selectedCharacterId,
}: CharacterCardProps) => {
  const { id, name, image, status, species } = character;

  const checkStatus = (status: IStatus) => {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      case 'unknown':
        return 'yellow';
      default:
        return 'purple';
    }
  };

  return (
    <div
      data-testid="container-for-character-card"
      onClick={() => {
        onClick(character);
      }}
      key={id}
      className={`flex flex-col p-2 sm:p-0 sm:flex-row items-center w-50 cursor-pointer
       bg-white border border-gray-200 rounded-lg 
       shadow md:max-w-xl hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
        ${selectedCharacterId === id && 'border-green-700 border-2'}`}
    >
      <Image
        className="rounded-t-lg max-h-60 w-20 md:h-auto md:rounded-none md:rounded-l-lg"
        src={image}
        width={80}
        height={80}
        alt={character.name}
        priority={true}
      />
      <div className="flex flex-col justify-between p-2 leading-normal w-full">
        <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white text-center">
          {name}
        </h5>
        <div className="flex gap-2 justify-center flex-wrap">
          <Badge
            color={checkStatus(status)}
            className="max-w-fit"
            data-testid="badge-for-name"
          >
            {status}
          </Badge>
          <Badge color="purple" className="max-w-fit">
            {species}
          </Badge>
        </div>
      </div>
    </div>
  );
};
export default CharacterCard;
