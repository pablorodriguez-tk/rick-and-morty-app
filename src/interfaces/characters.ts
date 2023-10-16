export interface ICharactersResponse {
  characters: Characters;
}

export interface Characters {
  info: IInfo;
  results: ICharacters[];
}

export interface IInfo {
  count: number;
  pages: number;
  prev: number;
  next: number;
}

export interface ICharacters {
  id: string;
  name: string;
  status: IStatus;
  species: string;
  image: string;
}

export type IStatus = 'Alive' | 'Dead' | 'unknown';
