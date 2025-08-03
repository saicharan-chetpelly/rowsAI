import React, { ChangeEvent, useRef, useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FileType } from 'utils/types';
import { useFileContext } from 'utils/context/FileContext';
import { getFileExtension } from 'utils/function';
import { CSV_ERROR_READ, XSLX_ERROR_READ } from 'utils/constants';

const useDataActions = (createPageAndUploadFile: (file: File) => void) => {
  const [action, setAction] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFileContent } = useFileContext();

  const parseXLSXFileContent = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          await setFileContent(parsedData, FileType.XSLX);
          createPageAndUploadFile(file);
        }
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error(XSLX_ERROR_READ, error);
    }
  };

  const parseCSVFileContent = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          Papa.parse(data, {
            complete: async (result) => {
              createPageAndUploadFile(file);
              await setFileContent(result.data, FileType.CSV);
            },
            error: (error) => {
              console.error(CSV_ERROR_READ, error);
            },
          });
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error(CSV_ERROR_READ, error);
    }
  };
  const handleImportFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const fileExtension = getFileExtension(file.name);
      if (fileExtension === FileType.XSLX) {
        await parseXLSXFileContent(file);
      } else if (fileExtension === FileType.CSV) {
        await parseCSVFileContent(file);
      }
    }
  };
  const handleChangeAction = (event: ChangeEvent<HTMLInputElement>) => {
    setAction(event.target.value);
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return {
    action,
    fileInputRef,
    handleImportFileChange,
    handleChangeAction,
    handleChooseFileClick,
  };
};

export default useDataActions;
