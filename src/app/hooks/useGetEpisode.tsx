import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_EPISODE } from '../services/graphql/query/getEpisode';
import type { IEpisodeResponse } from '../interfaces/episode';

const useGetEpisode = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [getEpisode, { data: charactersInEpisode }] =
    useLazyQuery<IEpisodeResponse>(GET_EPISODE);

  const onClickGetEpisode = (id: string) => {
    getEpisode({
      variables: { episodeId: id },
    });
    setOpenModal(true);
  };

  return { openModal, charactersInEpisode, onClickGetEpisode, setOpenModal };
};
export default useGetEpisode;
