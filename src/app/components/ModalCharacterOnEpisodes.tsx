'use client';

import { Card, Modal } from 'flowbite-react';
import type { IEpisodeResponse } from '../interfaces/episode';
import Image from 'next/image';

interface ModalCharacterOnEpisodesProps {
  open: boolean;
  setOpenModal: (open: boolean) => void;
  characters: IEpisodeResponse | undefined;
}

const ModalCharacterOnEpisodes = ({
  open,
  setOpenModal,
  characters,
}: ModalCharacterOnEpisodesProps) => {
  return (
    <Modal
      show={open && !!characters?.episode?.characters?.length}
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <Modal.Header>
        {`${characters?.episode.name} - (${characters?.episode.episode})`}
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4">
        {characters?.episode.characters.map(({ name, id, image }) => {
          return (
            <Card key={id + name + image}>
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={image}
                  width={64}
                  height={64}
                  className="rounded-full w-16"
                  alt={name}
                />
                <div key={id}>{name}</div>
              </div>
            </Card>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};
export default ModalCharacterOnEpisodes;
