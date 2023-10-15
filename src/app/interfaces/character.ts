export interface ICharacterResponse {
  character: ICharacter;
}

export interface ICharacter {
  id: string;
  episode: IEpisode[];
}

export interface IEpisode {
  id: string;
  air_date: string;
  name: string;
  episode: string;
}
