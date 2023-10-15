'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type SetStateAction,
  type Dispatch,
  type ReactNode,
} from 'react';

import type { ICharacters } from '../interfaces/characters';

export interface DataType {
  character1: ICharacters | null;
  character2: ICharacters | null;
}

interface ContextProps {
  selectedCharacters: DataType;
  setSelectedCharacters: Dispatch<SetStateAction<DataType>>;
}

const GlobalContext = createContext<ContextProps>({
  selectedCharacters: {
    character1: null,
    character2: null,
  },
  setSelectedCharacters: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedCharacters, setSelectedCharacters] = useState<DataType>({
    character1: null,
    character2: null,
  });

  const contextValue = useMemo(() => {
    return { selectedCharacters, setSelectedCharacters };
  }, [selectedCharacters, setSelectedCharacters]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
