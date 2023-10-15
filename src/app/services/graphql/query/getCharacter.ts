import { gql } from '@apollo/client';

export const GET_CHARACTER = gql`
  query character($characterId: ID!) {
    character(id: $characterId) {
      id
      episode {
        id
        air_date
        name
        episode
      }
    }
  }
`;
