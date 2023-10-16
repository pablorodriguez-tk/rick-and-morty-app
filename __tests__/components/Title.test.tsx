import Title from '@/components/Title';
import { render, screen } from '@testing-library/react';

describe('Title', () => {
  it('Shoud render title "Test Title"', async () => {
    render(<Title title="Test Title" />);

    expect(await screen.findByText('Test Title')).toBeInTheDocument();
  });

  it('Shoud render title "Test Title" with position "center"', async () => {
    render(<Title title="Test Title" position="center" />);

    expect(await screen.findByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
      'text-center',
    );
  });

  it('Shoud render title "Test Title" with position "left"', async () => {
    render(<Title title="Test Title" position="left" />);

    expect(await screen.findByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-left');
  });

  it('Shoud render title "Test Title" with position "right"', async () => {
    render(<Title title="Test Title" position="right" />);

    expect(await screen.findByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-right');
  });
});
