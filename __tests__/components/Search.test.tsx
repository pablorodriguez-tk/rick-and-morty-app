import Search from '@/components/Search';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Search', () => {
  it('should render with initial value', () => {
    const initialValue = 'Rick';
    const onChange = jest.fn();
    render(<Search initialValue={initialValue} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialValue);
  });

  it('should call onChange when input value changes', async () => {
    const initialValue = 'Rick';
    const onChange = jest.fn();
    render(<Search initialValue={initialValue} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    const newValue = 'Morty';
    await userEvent.type(input, newValue);
    expect(onChange).toHaveBeenCalledTimes(newValue.length);
  });

  it('should not submit the form', async () => {
    const onSubmit = jest.fn();
    render(<Search onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    const newValue = 'Morty';
    await userEvent.type(input, newValue);
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
