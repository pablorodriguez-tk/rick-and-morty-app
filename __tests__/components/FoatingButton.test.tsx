import FloatingButton from '@/components/FloatingButton';
import { render, fireEvent, screen } from '@testing-library/react';

describe('FloatingButton', () => {
  it('should render the button with the provided icon', () => {
    render(<FloatingButton onClick={() => {}} icon={<span>🚀</span>} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🚀');
  });

  it('should call the onClick function when the button is clicked', () => {
    const onClick = jest.fn();
    render(<FloatingButton onClick={onClick} icon={<span>🚀</span>} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply the provided className to the button', () => {
    render(
      <FloatingButton
        onClick={() => {}}
        icon={<span>🚀</span>}
        className="my-class"
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('my-class');
  });
});
