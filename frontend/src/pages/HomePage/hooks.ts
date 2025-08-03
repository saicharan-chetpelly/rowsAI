import { useCallback, useEffect, useState } from 'react';
import {
  createNewSpreadsheet,
  getAllSpreadsheets,
  getSpreadsheetById,
  updateSpreadsheetTitleById,
} from 'services';
import { calculateLastModified } from 'utils/function';
import { SpreadsheetModel, ISpreadSheetInfo } from 'utils/types';

const useSpreadsheet = () => {
  const [spreadSheets, setSpreadSheets] = useState<ISpreadSheetInfo[]>([]);

  const fetchAllSpreadsheets = async () => {
    const response = await getAllSpreadsheets();
    if (response?.status === 200) {
      const formattedData: ISpreadSheetInfo[] = response.data.map(
        (spreadsheet: SpreadsheetModel) => {
          const updatedAt = new Date(spreadsheet.updatedAt);
          const lastModified: string = calculateLastModified(updatedAt);

          return {
            id: spreadsheet.id.toString(),
            title: spreadsheet.title,
            categoryType: 'Health',
            lastModified,
            updatedAt: spreadsheet.updatedAt,
          };
        },
      );
      formattedData.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

      setSpreadSheets(formattedData);
    }
  };

  const updateSpreadsheetTitle = useCallback(
    async (spreadsheetId: string, updatedTitle: string) => {
      const formattedSpreadsheetId = parseInt(spreadsheetId, 10);
      await updateSpreadsheetTitleById(formattedSpreadsheetId, updatedTitle);
    },
    [],
  );

  const getCurrentSpreadsheetTitle = useCallback(
    async (spreadSheetId: number) => {
      const response = await getSpreadsheetById(spreadSheetId);
      if (response?.status === 200) {
        return response.data.title;
      }
      return '';
    },
    [],
  );

  const createSpreadsheet = async () => {
    try {
      const response = await createNewSpreadsheet(
        `Untitled ${spreadSheets.length + 1}`,
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error in createSpreadsheet:', error);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await fetchAllSpreadsheets();
    };
    fetchAll();
  }, [updateSpreadsheetTitle]);

  return {
    fetchAllSpreadsheets,
    spreadSheets,
    setSpreadSheets,
    updateSpreadsheetTitle,
    getCurrentSpreadsheetTitle,
    createSpreadsheet,
  };
};

export default useSpreadsheet;
