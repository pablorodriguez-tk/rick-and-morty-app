import EpisodeTable from '@/components/EpisodeTable';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const episodeList = [
  {
    id: '1',
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [],
    url: '',
    created: '',
  },
  {
    id: '2',
    name: 'Lawnmower Dog',
    air_date: 'December 9, 2013',
    episode: 'S01E02',
    characters: [],
    url: '',
    created: '',
  },
];

describe('EpisodeTable', () => {
  it('renders the episode table with the correct title and secondary title', () => {
    render(
      <EpisodeTable
        episodeList={episodeList}
        title="Episodes"
        secondaryTitle="Select an episode to view details"
        onClick={() => {}}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Episodes' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select an episode to view details'),
    ).toBeInTheDocument();
  });

  it('renders the episode list with the correct data', () => {
    render(
      <EpisodeTable
        episodeList={episodeList}
        title="Episodes"
        secondaryTitle="Select an episode to view details"
        onClick={() => {}}
      />,
    );

    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('S01E02')).toBeInTheDocument();
    expect(screen.getByText(/Pilot/)).toBeInTheDocument();
    expect(screen.getByText(/Lawnmower Dog/)).toBeInTheDocument();
    expect(screen.getByText(/December 2, 2013/)).toBeInTheDocument();
    expect(screen.getByText(/December 9, 2013/)).toBeInTheDocument();
  });

  it('calls the onClick function with the correct id when an episode is clicked', async () => {
    const handleClick = jest.fn();

    render(
      <EpisodeTable
        episodeList={episodeList}
        title="Episodes"
        secondaryTitle="Select an episode to view details"
        onClick={handleClick}
      />,
    );

    await userEvent.click(screen.getByText(/Pilot/));

    expect(handleClick).toHaveBeenCalledWith('1');
  });

  it('renders the empty state when there are no episodes', () => {
    render(
      <EpisodeTable
        episodeList={[]}
        title="Episodes"
        secondaryTitle="Select an episode to view details"
        onClick={() => {}}
      />,
    );

    expect(screen.getByText(/There is no shared episodes/)).toBeInTheDocument();
  });
});
