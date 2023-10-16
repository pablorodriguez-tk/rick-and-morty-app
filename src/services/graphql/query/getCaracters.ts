import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;
