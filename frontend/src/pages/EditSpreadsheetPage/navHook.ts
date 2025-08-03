import React from 'react';
import { getDataTablesByPageId, getPagesBySpreadsheetId } from 'services';
import { convertJSONToSpreadsheetFormat } from 'utils/function';
import {
  DataTableModel,
  DataTableType,
  PageDataTableType,
  PageModel,
} from 'utils/types';

const useNavigation = () => {
  const fetchPagesAndDataTables = async (
    spreadsheetId: number,
    setActivePageId: (pageId: number) => void,
    setActivePageTitle: (pageTitle: string) => void,
    createdDataId: number | null,
  ) => {
    const response = await getPagesBySpreadsheetId(spreadsheetId);
    if (response?.status === 200) {
      const pages = response.data;
      if (!createdDataId && pages.length > 0) {
        setActivePageId(pages[0].id);
        setActivePageTitle(pages[0].title);
      }
      const pageNavItems: PageDataTableType[] = await Promise.all(
        pages?.map(async (page: PageModel) => {
          const dataTableResponse = await getDataTablesByPageId(page.id);
          if (dataTableResponse?.status === 200) {
            const dataTableData: DataTableType[] = dataTableResponse?.data?.map(
              (dataTable: DataTableModel) => ({
                id: dataTable.id.toString(),
                data: convertJSONToSpreadsheetFormat(dataTable.file_content),
                title: dataTable.table_name,
              }),
            );

            return {
              navItemId: page.id.toString(),
              textVariant: 'body1',
              text: page.title,
              textColor: 'theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS',
              dataTableData,
            };
          }
        }),
      );

      return pageNavItems;
    }

    return [];
  };
  return {
    fetchPagesAndDataTables,
  };
};

export default useNavigation;
