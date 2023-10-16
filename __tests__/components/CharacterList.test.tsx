import CharacterList from '@/components/CharacterList';
import type { ICharacters } from '@/interfaces/characters';
import { render, screen, fireEvent } from '@testing-library/react';

const characters: ICharacters[] = [
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
];

describe('CharacterList', () => {
  it('renders a list of characters', () => {
    render(
      <CharacterList
        characters={characters}
        onClick={() => {}}
        selectedCharacterId="1"
      />,
    );
    const characterItems = screen.getAllByTestId(
      'container-for-character-card',
    );
    expect(characterItems).toHaveLength(2);
  });

  it('calls onClick when a character is clicked', () => {
    const onClick = jest.fn();
    render(
      <CharacterList
        characters={characters}
        onClick={onClick}
        selectedCharacterId="1"
      />,
    );
    const characterItem = screen.getByText('Rick Sanchez');
    fireEvent.click(characterItem);
    expect(onClick).toHaveBeenCalledWith(characters[0]);
  });

  it('displays a loading message when loading prop is true', () => {
    render(
      <CharacterList
        characters={characters}
        onClick={() => {}}
        loading={true}
        selectedCharacterId="1"
      />,
    );
    const loadingMessage = screen.getAllByRole('status');
    expect(loadingMessage).toHaveLength(20);
  });
});
