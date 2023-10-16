import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTERS } from '@/services/graphql/query/getCaracters';

export const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        page: 1,
        filter: { name: '' },
      },
    },
    data: {
      characters: {
        info: {
          count: 826,
          next: 2,
          pages: 42,
          prev: null,
        },
        results: [
          {
            id: '1',
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          },
          {
            id: '2',
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          },
          {
            id: '3',
            name: 'Summer Smith',
            status: 'Alive',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
          },
          {
            id: '4',
            name: 'Beth Smith',
            status: 'Alive',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
          },
          {
            id: '5',
            name: 'Jerry Smith',
            status: 'Alive',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
          },
          {
            id: '6',
            name: 'Abadango Cluster Princess',
            status: 'Alive',
            species: 'Alien',
            image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
          },
          {
            id: '7',
            name: 'Abradolf Lincler',
            status: 'unknown',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
          },
          {
            id: '8',
            name: 'Adjudicator Rick',
            status: 'Dead',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
          },
          {
            id: '9',
            name: 'Agency Director',
            status: 'Dead',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
          },
          {
            id: '10',
            name: 'Alan Rails',
            status: 'Dead',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
          },
          {
            id: '11',
            name: 'Albert Einstein',
            status: 'Dead',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
          },
          {
            id: '12',
            name: 'Alexander',
            status: 'Dead',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
          },
          {
            id: '13',
            name: 'Alien Googah',
            status: 'unknown',
            species: 'Alien',
            image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
          },
          {
            id: '14',
            name: 'Alien Morty',
            status: 'unknown',
            species: 'Alien',
            image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
          },
          {
            id: '15',
            name: 'Alien Rick',
            status: 'unknown',
            species: 'Alien',
            image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
          },
          {
            id: '16',
            name: 'Amish Cyborg',
            status: 'Dead',
            species: 'Alien',
            image: 'https://rickandmortyapi.com/api/character/avatar/16.jpeg',
          },
          {
            id: '17',
            name: 'Annie',
            status: 'Alive',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/17.jpeg',
          },
          {
            id: '18',
            name: 'Antenna Morty',
            status: 'Alive',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/18.jpeg',
          },
          {
            id: '19',
            name: 'Antenna Rick',
            status: 'unknown',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
          },
          {
            id: '20',
            name: 'Ants in my Eyes Johnson',
            status: 'unknown',
            species: 'Human',
            image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
          },
        ],
      },
    },
  },
];

describe('Home', () => {
  it('Should have text "Character #1"', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );
    expect(await screen.findByText('Character #1')).toBeInTheDocument();
  });

  it('Should have text "Character #2"', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );
    expect(await screen.findByText('Character #2')).toBeInTheDocument();
  });

  it('Home Snapshot', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
