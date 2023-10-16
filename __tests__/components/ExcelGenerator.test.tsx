import ExcelGenerator from '@/components/ExcelGenerator';
import { render, fireEvent, screen } from '@testing-library/react';
import * as XLSX from 'xlsx';

jest.mock('xlsx', () => ({
  utils: {
    book_new: jest.fn(),
    json_to_sheet: jest.fn(),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));

describe('ExcelGenerator', () => {
  const data = [
    { name: 'Rick', age: 70 },
    { name: 'Morty', age: 14 },
  ];
  const fileName = 'test-file';
  const sheetName = ['Sheet 1', 'Sheet 2'];

  it('should render the button with the correct text', () => {
    render(
      <ExcelGenerator fileName={fileName} data={data} sheetName={sheetName} />,
    );
    const button = screen.getByText('Export to Excel');
    expect(button).toBeInTheDocument();
  });

  it('should generate an excel file when the button is clicked', () => {
    const data = [{ name: 'John Doe', age: 30, email: 'johndoe@example.com' }];
    const fileName = 'test_file';
    const sheetName = ['Sheet1'];

    render(
      <ExcelGenerator fileName={fileName} data={data} sheetName={sheetName} />,
    );

    const button = screen.getByText('Export to Excel');
    fireEvent.click(button);

    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(data[0]);
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
  });
});
