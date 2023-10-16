'use client';

import * as XLSX from 'xlsx';

interface IExcelGeneratorProps {
  fileName: string;
  sheetName: Array<string | undefined>;
  data: any[];
}

const ExcelGenerator = ({
  fileName,
  data,
  sheetName,
}: IExcelGeneratorProps) => {
  const generateExcel = () => {
    const wb = XLSX.utils.book_new();
    for (let i = 0; i < data.length; i++) {
      const ws = XLSX.utils.json_to_sheet(data[i]);

      XLSX.utils.book_append_sheet(
        wb,
        ws,
        `${i + 1}.${sheetName[i]?.slice(0, 28)}`,
      );
    }

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={generateExcel}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Export to Excel
      </span>
    </button>
  );
};

export default ExcelGenerator;
