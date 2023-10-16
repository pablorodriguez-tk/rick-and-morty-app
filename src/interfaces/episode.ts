export interface IEpisodeResponse {
  episode: Episode;
}

export interface Episode {
  name: string;
  episode: string;
  characters: Character[];
}

export interface Character {
  name: string;
  image: string;
  id: string;
}
