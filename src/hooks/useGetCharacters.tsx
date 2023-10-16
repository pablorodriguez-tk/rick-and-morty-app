import { useEffect, useState } from 'react';
import { GET_CHARACTERS } from '../services/graphql/query/getCaracters';
import type { ICharactersResponse } from '../interfaces/characters';
import { useQuery } from '@apollo/client';
import { useGlobalContext } from '@/context/store';

interface IUseGetCharacters {
  listNumber: number;
}

const useGetCharacters = ({ listNumber }: IUseGetCharacters) => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const { setSelectedCharacters } = useGlobalContext();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(search);
      setSelectedCharacters((prev) => {
        return { ...prev, [`character${listNumber}`]: undefined };
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, listNumber, setSelectedCharacters]);

  const { data, loading } = useQuery<ICharactersResponse>(GET_CHARACTERS, {
    variables: {
      page,
      filter: { name: debouncedSearchTerm },
    },
  });

  return {
    data,
    loading,
    page,
    search,
    setSearch,
    setPage,
  };
};
export default useGetCharacters;
