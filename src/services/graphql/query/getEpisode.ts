import { gql } from '@apollo/client';

export const GET_EPISODE = gql`
  query episode($episodeId: ID!) {
    episode(id: $episodeId) {
      name
      episode
      characters {
        name
        image
      }
    }
  }
`;
