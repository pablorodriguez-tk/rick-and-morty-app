import InputText from '@/components/InputText';
import { render, fireEvent, screen } from '@testing-library/react';

describe('InputText', () => {
  it('renders the input with the correct label', () => {
    const label = 'Name';
    render(
      <InputText
        name="name"
        label={label}
        onChange={() => {}}
        initialValue=""
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('placeholder', ' ');
    const inputLabel = screen.getByText(label);
    expect(inputLabel).toBeInTheDocument();
  });

  it('calls the onChange function when the input value changes', () => {
    const onChange = jest.fn();
    render(
      <InputText
        name="name"
        label="Name"
        onChange={(e) => onChange(e.target.value)}
        initialValue=""
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('John');
  });

  it('renders the input with the correct initial value', () => {
    const initialValue = 'John';
    render(
      <InputText
        name="name"
        label="Name"
        onChange={() => {}}
        initialValue={initialValue}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialValue);
  });

  it('renders the input with the correct value after change', () => {
    const onChange = jest.fn();
    const initialValue = 'John';
    render(
      <InputText
        name="name"
        label="Name"
        onChange={(e) => onChange(e.target.value)}
        initialValue={initialValue}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialValue);
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('Morty');
  });
});
