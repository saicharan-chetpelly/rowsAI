import { Matrix, RangeSelection } from 'react-spreadsheet';
import theme from 'theme';
import { ChartType } from 'components/molecules/Chart';
import {
  ALPHABETS_MAPPING_DATAKEY_SET,
  CHART_SELECT_MENU_OPTIONS_DATA,
  DYNAMIC_STYLES_TEXT,
} from './constants';
import {
  ChartLabel,
  DataKeysResult,
  DataTableType,
  PageDataTableType,
  PageNavItemType,
  PageSectionType,
  SpreadsheetsData,
  TypographyVarient,
} from './types';
import { getDataTablesByPageId } from 'services';

export const pxToEm = (pxValue: number, baseFontSize = 16): string =>
  `${pxValue / baseFontSize}em`;

export const getFileExtension = (fileName: string): string => {
  return fileName.slice(fileName.lastIndexOf('.'));
};

export const getColumnAlphabet = (columnIndex: number): string => {
  let result = '';
  let index = columnIndex;
  while (index >= 0) {
    const remainder = index % 26;
    result = String.fromCharCode(65 + remainder) + result;
    index = Math.floor(index / 26) - 1;
  }
  return result;
};

export const applyDynamicStyling = (selectedRange: RangeSelection | null) => {
  if (selectedRange) {
    const startRow = selectedRange.range.start.row + 2;
    const startColumn = selectedRange.range.start.column + 2;
    const endRow = selectedRange.range.end.row + 2;
    const endColumn = selectedRange.range.end.column + 2;

    const selector = `
    .Spreadsheet__table tr:nth-child(1) th:nth-child(n + ${startColumn}):nth-child(-n + ${endColumn}),
    .Spreadsheet__table tr:nth-child(n + ${startRow}):nth-child(-n + ${endRow}) th:nth-child(1)
    `;
    const dynamicStyles = `
        ${selector} {
            background-color: ${theme.palette.greyCustom[100]};
        }
    `;

    const styleElement = document.getElementById(DYNAMIC_STYLES_TEXT);
    if (styleElement) {
      styleElement.innerHTML = dynamicStyles;
    } else {
      const newStyleElement = document.createElement('style');
      newStyleElement.id = DYNAMIC_STYLES_TEXT;
      newStyleElement.innerHTML = dynamicStyles;
      document.head.appendChild(newStyleElement);
    }
  }
};

export const convertXLSXDataToSpreasheetDataFormat = async (inputData: []) =>
  new Promise((resolve, reject) => {
    try {
      const spreadsheetData = [];
      for (let i = 0; i < inputData.length; i++) {
        const row = [];
        for (let j = 0; j < inputData[i].length; j++) {
          row.push({ value: inputData[i][j] });
        }
        spreadsheetData.push(row);
      }
      resolve(spreadsheetData);
    } catch (error) {
      reject(error);
    }
  });

export const getColumnHeaderNames = (
  startColumn: number,
  endColumn: number,
  dataState: Matrix<{
    value: string;
  }>,
) => {
  const columnHeaderNames = [];
  for (let i = startColumn; i <= endColumn; i += 1) {
    columnHeaderNames.push(dataState[0][i]);
  }
  return columnHeaderNames;
};

export const getFormattedDataToCharts = (
  selectedData: any[],
  alphabet: string[],
) => {
  const formattedData = [];

  for (let i = 0; i < selectedData.length; i++) {
    const columnData = selectedData[i];
    const column = {};
    column['name'] = columnData[columnData.length - 1];
    for (let j = 0; j < columnData.length - 1; j++) {
      const key = alphabet[j];
      column[key] = columnData[j];
    }

    formattedData.push(column);
  }
  return formattedData;
};

export const getSelectedChartType = (value: string): ChartType => {
  switch (value) {
    case CHART_SELECT_MENU_OPTIONS_DATA[0].value:
      return ChartType.LINE_CHART;
    case CHART_SELECT_MENU_OPTIONS_DATA[1].value:
      return ChartType.BAR_CHART;
    case CHART_SELECT_MENU_OPTIONS_DATA[2].value:
      return ChartType.COMBO;
    case CHART_SELECT_MENU_OPTIONS_DATA[3].value:
      return ChartType.BAR_CHART;
    case CHART_SELECT_MENU_OPTIONS_DATA[4].value:
      return ChartType.STACKED_COLUMN;
    case CHART_SELECT_MENU_OPTIONS_DATA[5].value:
      return ChartType.STACKED_BAR;
    case CHART_SELECT_MENU_OPTIONS_DATA[6].value:
      return ChartType.SCATTER_CHART;
    case CHART_SELECT_MENU_OPTIONS_DATA[7].value:
      return ChartType.PIE_CHART;
    default:
      return ChartType.LINE_CHART;
  }
};

export const generateDataKeys = (
  selectedSpreadsheetRange: RangeSelection,
  dataState: Matrix<{
    value: string;
  }>,
): DataKeysResult => {
  const startRow = selectedSpreadsheetRange.range.start.row;
  const startColumn = selectedSpreadsheetRange.range.start.column;
  const endRow = selectedSpreadsheetRange.range.end.row;
  const endColumn = selectedSpreadsheetRange.range.end.column;

  if (startRow === endRow && startColumn === endColumn) {
    console.warn('one celli');
  } else {
    const columnNames = getColumnHeaderNames(startColumn, endColumn, dataState);
    const selectedData: any[] = [];
    let columnIndex = 0;
    for (let col = startColumn; col <= endColumn; col += 1, columnIndex += 1) {
      const temp: any[] = [];
      for (let row = startRow; row <= endRow; row += 1) {
        temp.push(dataState[row][col]?.value);
      }
      temp.push(columnNames[columnIndex]?.value);
      selectedData.push(temp);
    }
    const alphabet = ALPHABETS_MAPPING_DATAKEY_SET.split('');
    const formattedData = getFormattedDataToCharts(selectedData, alphabet);

    return {
      numKeys: Object.keys(formattedData[0]).length,
      alphabet,
      formattedData,
    };
  }
};

export const getLabelNamesForChart = (
  selectedSpreadsheetRange: RangeSelection,
  dataState: Matrix<{
    value: string;
  }>,
) => {
  const startColumn = selectedSpreadsheetRange.range.start.column;
  const endColumn = selectedSpreadsheetRange.range.end.column;
  const columnNames = getColumnHeaderNames(startColumn, endColumn, dataState);
  return columnNames;
};

export const transformDataForChart = (data: { value: string }[]) =>
  data.map((item, index) => {
    let color;
    switch (index) {
      case 0:
        color = theme.palette.green[100];
        break;
      case 1:
        color = theme.palette.red[200];
        break;
      case 2:
        color = theme.palette.yellow[100];
        break;
      default:
        color = theme.palette.primary.main;
        break;
    }
    return { name: item.value, color };
  });
export const processDataForChart = (
  selectedSpreadsheetRange: RangeSelection,
  dataState: Matrix<{
    value: string;
  }>,
) => {
  const result = generateDataKeys(selectedSpreadsheetRange, dataState);
  const columnNames = getLabelNamesForChart(
    selectedSpreadsheetRange,
    dataState,
  );

  const labels = transformDataForChart(columnNames);

  return { result, columnNames, labels };
};

export const processSelectedSpreadsheetRange = (
  selectedSpreadsheetRange: RangeSelection | null,
  dataState: Matrix<{
    value: string;
  }>,
  setDatakeys: React.Dispatch<React.SetStateAction<[]>>,
  setChartData: React.Dispatch<React.SetStateAction<[]>>,
  setChartLabels: React.Dispatch<React.SetStateAction<ChartLabel[]>>,
) => {
  if (selectedSpreadsheetRange instanceof RangeSelection) {
    const { result, labels } = processDataForChart(
      selectedSpreadsheetRange,
      dataState,
    );
    if (result !== undefined) {
      const { numKeys, alphabet, formattedData } = result;
      if (numKeys !== null && alphabet !== null && formattedData !== null) {
        setDatakeys(() => {
          const slicedAlphabet = alphabet!.slice(0, numKeys);
          return slicedAlphabet as [];
        });
        setChartData(formattedData as []);
        setChartLabels(labels);
      } else {
        setDatakeys([]);
        setChartData([]);
      }
    } else {
      setDatakeys([]);
      setChartData([]);
    }
  }
};

export async function fetchDataAndUpdateState(
  fileDataRef,
  fileData,
  fileContent,
  setDataState,
  setSpreadsheetsData,
  spreadsheetsData,
  createdDataId,
  createdDataTableName,
) {
  try {
    if (
      createdDataId !== undefined &&
      fileDataRef.current !== fileData?.length
    ) {
      fileDataRef.current = fileData.length;
      const newDataState = await convertXLSXDataToSpreasheetDataFormat(
        fileContent as [],
      );
      setDataState(newDataState);

      const numberOfSpreadsheets = spreadsheetsData
        ? spreadsheetsData.length
        : 0;
      setSpreadsheetsData(createdDataTableName, newDataState, createdDataId);
    } else {
      const newDataState = await convertXLSXDataToSpreasheetDataFormat(
        fileContent as [],
      );
      setDataState(newDataState);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const convertJSONDataToCommaSeparatedData = (
  jsonArray: Record<string, any>[],
): Array<Array<any>> => {
  if (jsonArray.length === 0) return [];

  const keys = Object.keys(jsonArray[0]);
  const result: Array<Array<any>> = [keys];

  jsonArray.forEach((jsonData) => {
    const values = Object.values(jsonData);
    const dataRow: Array<any> = [];
    for (let i = 0; i < values.length; i++) {
      dataRow.push(values[i]);
    }
    result.push(dataRow);
  });

  return result;
};

export const convertJSONToSpreadsheetFormat = (
  jsonData: Record<string, any>[],
): Matrix<{ value: string }> => {
  if (jsonData.length === 0) return [];

  const keys = Object.keys(jsonData[0]);
  const result = [keys.map((key) => ({ value: key }))];

  jsonData.forEach((data) => {
    const values = keys.map((key) => ({ value: data[key] }));
    result.push(values);
  });

  return result;
};

export const JSONDataToCommaSeparatedData = (
  jsonArray: Record<string, any>[],
): Array<Array<any>> => {
  if (jsonArray.length === 0) return [];

  const keys = Object.keys(jsonArray[0]);
  const result: Array<Array<any>> = [keys];

  jsonArray.forEach((jsonData) => {
    const values = Object.values(jsonData);
    const dataRow: Array<any> = [];
    for (let i = 0; i < values.length; i++) {
      dataRow.push(values[i]);
    }
    result.push(dataRow);
  });

  return result;
};

const getDataTableTitleAndPageIdList = (
  dataTable: any[],
): PageSectionType[] => {
  const pageSectionInfos: PageSectionType[] = [];

  dataTable.map((table) =>
    pageSectionInfos.push({
      id: table.page_id,
      title: table.table_name,
    }),
  );

  return pageSectionInfos;
};

export const updateSpreadsheetData = async (
  pageId: number,
  setSpreadsheetsData: (
    title: string,
    data: Matrix<{
      value: string;
    }>,
    id?: string,
  ) => void,
  setNavData: React.Dispatch<React.SetStateAction<PageNavItemType[]>>,
  setNavPageDataTableData: (
    navItemId: string,
    textVariant: TypographyVarient,
    text: string,
    pageSectionData: PageSectionType[],
    textColor?: string,
  ) => void,
  clearSpreadsheetsData: () => void,
) => {
  if (pageId) {
    clearSpreadsheetsData();
    const response = await getDataTablesByPageId(pageId);
    if (response?.status === 200) {
      const dataTables = response.data;
      const dataTablesItems: SpreadsheetsData[] = dataTables.map(
        (dataTable) => ({
          id: dataTable.id,
          title: dataTable.table_name,
          data: dataTable.file_content,
        }),
      );
      dataTablesItems.forEach((dataTable) => {
        const formattedSpreadsheetData = convertJSONToSpreadsheetFormat(
          dataTable.data,
        );
        setSpreadsheetsData(
          dataTable.title,
          formattedSpreadsheetData,
          dataTable.id,
        );
      });

      setNavData((prevPages) => {
        const pageSectionInfos = getDataTableTitleAndPageIdList(dataTables);
        const pages = prevPages.map((page) => {
          if (page.navItemId === pageId.toString()) {
            if (!page.pageSectionData) {
              page.pageSectionData = [];
            } else {
              page.pageSectionData = page.pageSectionData.filter(
                (existingSection) =>
                  !pageSectionInfos.some(
                    (newSection) => newSection.id === existingSection.id,
                  ),
              );
            }
            page.pageSectionData.push(...pageSectionInfos);
          }
          setNavPageDataTableData(
            page.navItemId,
            page.textVariant,
            page.text,
            page.pageSectionData,
            page.textColor,
          );
          return page;
        });
        return pages;
      });
    }
  }
};

export const updatePageAndDataTableContext = (
  pageAndDataTablesData: PageDataTableType[],
  setPageAndDataTablesData: (
    navItemId: string,
    text: string,
    dataTableData: DataTableType[],
  ) => void,
) => {
  pageAndDataTablesData?.map((navItem) => {
    setPageAndDataTablesData(
      navItem.navItemId,
      navItem.text,
      navItem.dataTableData,
    );
  });
};

export const scrollToSpecificDataTable = (dataTableId: string) => {
  const dataTable = document.getElementById(`spreadsheet-${dataTableId}`);
  if (dataTable) {
    dataTable.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const jsonToCsv = (jsonData: any[]) => {
  if (jsonData.length === 0) {
    return '';
  }
  const headers = Object.keys(jsonData[0]);

  const csvRows = [];
  csvRows.push(headers.join(','));

  for (const obj of jsonData) {
    const values = headers.map((header) => obj[header]);
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

export const calculateLastModified = (updatedAt: Date): string => {
  const currentTime = new Date();
  const timezoneOffsetMinutes = currentTime.getTimezoneOffset();
  const utcTimeMilliseconds =
    currentTime.getTime() + timezoneOffsetMinutes * 60 * 1000;
  const utcTime = new Date(utcTimeMilliseconds);

  const timeDifference = Math.floor(
    (utcTime.getTime() - updatedAt.getTime()) / 60000,
  );

  if (timeDifference === 0) {
    return `few seconds ago`;
  }
  if (timeDifference < 60) {
    return `${timeDifference} minutes ago`;
  }
  if (timeDifference < 1440) {
    const hours = Math.floor(timeDifference / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  const days = Math.floor(timeDifference / 1440);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};
