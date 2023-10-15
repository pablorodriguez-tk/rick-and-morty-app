export interface ICharactersResponse {
  characters: Characters;
}

export interface Characters {
  info: Info;
  results: ICharacters[];
}

export interface Info {
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

export enum IStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}
