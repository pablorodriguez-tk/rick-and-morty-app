import { useEffect, useState } from 'react';
import { GET_CHARACTERS } from '../services/graphql/query/getCaracters';
import type { ICharactersResponse } from '../interfaces/characters';
import { useQuery } from '@apollo/client';

const useGetCharacters = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

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
