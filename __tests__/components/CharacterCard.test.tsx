import CharacterCard from '@/components/CharacterCard';
import type { ICharacters, IStatus } from '@/interfaces/characters';
import { render, screen } from '@testing-library/react';

const mockCharacter: ICharacters = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('CharacterCard', () => {
  it('Image should be rendered', async () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    expect(await screen.findByRole('img')).toBeInTheDocument();
  });

  it('Should have text "Rick Sanchez"', async () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('Should have text "Alive"', async () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    expect(await screen.findByText('Alive')).toBeInTheDocument();
  });

  it('Should have text "Human"', async () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    expect(await screen.findByText('Human')).toBeInTheDocument();
  });

  it('Should have badge color green', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    expect(screen.queryByTestId('badge-for-name')).toHaveClass('bg-green-100');
  });

  it('Should have badge color red', () => {
    render(
      <CharacterCard
        character={{
          ...mockCharacter,
          status: 'Dead',
        }}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    expect(screen.queryByTestId('badge-for-name')).toHaveClass('bg-red-100');
  });

  it('Should have badge color yellow', () => {
    render(
      <CharacterCard
        character={{
          ...mockCharacter,
          status: 'unknown',
        }}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    expect(screen.queryByTestId('badge-for-name')).toHaveClass('bg-yellow-100');
  });

  it('Should have badge color purple when is default', () => {
    render(
      <CharacterCard
        character={{
          ...mockCharacter,
          status: 'not a correct status' as IStatus,
        }}
        onClick={() => {}}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    expect(screen.queryByTestId('badge-for-name')).toHaveClass('bg-purple-100');
  });

  it('Should execute onClick function', () => {
    const onClick = jest.fn();
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={onClick}
        selectedCharacterId={undefined}
        key="1"
      />,
    );

    screen.getByRole('img').click();
    expect(onClick).toBeCalled();
  });

  it('should have border green when selected', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={() => {}}
        selectedCharacterId="1"
        key="1"
      />,
    );

    expect(screen.getByTestId('container-for-character-card')).toHaveClass(
      'border-green-700 border-2',
    );
  });
});
