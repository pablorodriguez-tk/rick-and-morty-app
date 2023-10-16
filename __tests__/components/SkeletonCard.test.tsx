import { render, screen } from '@testing-library/react';
import SkeletonCard from '../../src/app/components/SkeletonCard';

describe('SkeletonCard', () => {
  it('renders the skeleton card', () => {
    render(<SkeletonCard />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the skeleton card with the correct classes', () => {
    render(<SkeletonCard />);
    expect(screen.getByRole('status')).toHaveClass(
      'space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center',
    );
  });
});
