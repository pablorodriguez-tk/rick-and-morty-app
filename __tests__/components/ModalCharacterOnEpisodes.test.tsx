import ModalCharacterOnEpisodes from '@/app/components/ModalCharacterOnEpisodes';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockCharacters = {
  episode: {
    name: 'The Ricklantis Mixup',
    episode: 'S03E07',
    characters: [
      {
        name: 'Rick Sanchez',
        id: '1',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      {
        name: 'Morty Smith',
        id: '2',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      },
    ],
  },
};

describe('ModalCharacterOnEpisodes', () => {
  it('renders the modal when open and characters are present', () => {
    render(
      <ModalCharacterOnEpisodes
        open={true}
        setOpenModal={() => {}}
        characters={mockCharacters}
      />,
    );

    const modalHeader = screen.getByText(
      `${mockCharacters.episode.name} - (${mockCharacters.episode.episode})`,
    );
    expect(modalHeader).toBeInTheDocument();
    const characterCards = screen.getAllByTestId(
      'container-for-character-card',
    );
    expect(characterCards).toHaveLength(2);
  });

  it('does not render the modal when closed', () => {
    render(
      <ModalCharacterOnEpisodes
        open={false}
        setOpenModal={() => {}}
        characters={mockCharacters}
      />,
    );

    const modalHeader = screen.queryByText(
      `${mockCharacters.episode.name} - (${mockCharacters.episode.episode})`,
    );
    expect(modalHeader).not.toBeInTheDocument();
  });

  it('does not render the modal when characters are not present', () => {
    render(
      <ModalCharacterOnEpisodes
        open={true}
        setOpenModal={() => {}}
        characters={
          {
            episode: {
              name: 'The Ricklantis Mixup',
              episode: 'S03E07',
              characters: [],
            },
          } as any
        }
      />,
    );

    const modalHeader = screen.queryByText(
      `${mockCharacters.episode.name} - (${mockCharacters.episode.episode})`,
    );
    expect(modalHeader).not.toBeInTheDocument();
  });

  it('calls setOpenModal when the modal is closed', async () => {
    const mockSetOpenModal = jest.fn();
    render(
      <ModalCharacterOnEpisodes
        open={true}
        setOpenModal={mockSetOpenModal}
        characters={mockCharacters}
      />,
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockSetOpenModal).toHaveBeenCalledTimes(1);
    expect(mockSetOpenModal).toHaveBeenCalledWith(false);
  });
});
