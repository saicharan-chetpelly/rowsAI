import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Point, RangeSelection } from 'react-spreadsheet';
import {
  ChartLabel,
  DataTableType,
  Matrix,
  PageDataTableType,
  PageNavItemType,
  PageSectionType,
  TypographyVarient,
} from 'utils/types';
import { CHART_SELECT_MENU_OPTIONS_DATA } from './constants';
import theme from 'theme';

export interface SelectedChartsState {
  id?: string;
  value: string;
  rangeSelection: RangeSelection | null;
  dataKeys: any[];
  chartData: any[];
  chartLabels: ChartLabel[];
}
interface SpreadsheetsData {
  id?: string;
  data: Matrix<{
    value: string;
  }>;
  title: string;
}

export interface SpreadsheetState {
  currSelectedCell: [string, string];
  selectedSpreadsheetRange: RangeSelection | null;
  activeCell: Point | null;
  modifiedData: Matrix<{ value: string }> | null;
  selectedChartType: string;
  selectedCharts: SelectedChartsState[] | null;
  spreadsheetsData: SpreadsheetsData[] | null;
  navPageDataTablesData: PageNavItemType[];
  activePageId: number | null;
  activePageTitle: string;
  currActiveSpreadsheetId: number | null;
  currActiveSpreadsheetTitle: string;
  pageAndDataTablesData: PageDataTableType[];
}

type SpreadsheetContextType = {
  spreadsheetState: SpreadsheetState;
  setCurrSelectedCell: (cell: [string, string]) => void;
  setSelectedSpreadsheetRange: (range: RangeSelection | null) => void;
  setActiveCell: (cell: Point | null) => void;
  setModifiedData: (data: Matrix<{ value: string }> | null) => void;
  setSelectedChartType: (chartType: string) => void;
  setSelectedCharts: (
    value: string,
    range: RangeSelection | null,
    dataKeys: [],
    chartData: [],
    chartLabels: ChartLabel[],
    id?: string,
  ) => void;
  setSpreadsheetsData: (
    title: string,
    data: Matrix<{
      value: string;
    }>,
    id?: string,
  ) => void;
  setNavPageDataTableData: (
    navItemId: string,
    textVariant: TypographyVarient,
    text: string,
    pageSectionData: PageSectionType[],
    textColor?: string,
  ) => void;
  setActivePageId: (pageId: number) => void;
  clearSpreadsheetsData: () => void;
  setActivePageTitle: (pageTitle: string) => void;
  setCurrActiveSpreadsheetId: (spreadsheetId: number) => void;
  setPageAndDataTablesData: (
    navItemId: string,
    text: string,
    dataTableData: DataTableType[],
  ) => void;
  setCurrActiveSpreadsheetTitle: (spreadsheetTitle: string) => void;
  clearPageAndDataTableData: () => void;
};

export const SpreadsheetContext = createContext<SpreadsheetContextType>({
  spreadsheetState: {
    currSelectedCell: ['', ''],
    selectedSpreadsheetRange: null,
    activeCell: null,
    modifiedData: null,
    selectedChartType: '',
    selectedCharts: null,
    spreadsheetsData: null,
    navPageDataTablesData: [],
    activePageId: null,
    activePageTitle: 'Page 1',
    currActiveSpreadsheetId: null,
    pageAndDataTablesData: [],
    currActiveSpreadsheetTitle: 'Untitled',
  },
  setCurrSelectedCell: () => {},
  setSelectedSpreadsheetRange: () => {},
  setActiveCell: () => {},
  setModifiedData: () => {},
  setSelectedChartType: () => {},
  setSelectedCharts: () => {},
  setSpreadsheetsData: () => {},
  setNavPageDataTableData: () => {},
  setActivePageId: () => {},
  clearSpreadsheetsData: () => {},
  setActivePageTitle: () => {},
  setCurrActiveSpreadsheetId: () => {},
  setPageAndDataTablesData: () => {},
  setCurrActiveSpreadsheetTitle: () => {},
  clearPageAndDataTableData: () => {},
});

type SpreadsheetProviderProps = {
  children: React.ReactNode;
};

export const useSpreadsheetContext = () => useContext(SpreadsheetContext);

export const SpreadsheetProvider: React.FC<SpreadsheetProviderProps> = ({
  children,
}) => {
  const [spreadsheetState, setSpreadsheetState] = useState<SpreadsheetState>({
    currSelectedCell: ['', ''],
    selectedSpreadsheetRange: null,
    activeCell: null,
    modifiedData: null,
    selectedChartType: 'CHART_SELECT_MENU_OPTIONS_DATA[0].value',
    selectedCharts: null,
    spreadsheetsData: null,
    navPageDataTablesData: [],
    activePageId: null,
    activePageTitle: 'Page 1',
    currActiveSpreadsheetId: null,
    pageAndDataTablesData: [],
    currActiveSpreadsheetTitle: 'Untitled',
  });
  const clearPageAndDataTableData = () => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      pageAndDataTablesData: [],
    }));
  };
  const setCurrActiveSpreadsheetTitle = useCallback(
    (spreadsheetTitle: string) => {
      setSpreadsheetState((prevState) => ({
        ...prevState,
        currActiveSpreadsheetTitle: spreadsheetTitle,
      }));
    },
    [],
  );

  const setPageAndDataTablesData = useCallback(
    (navItemId: string, text: string, dataTableData: DataTableType[]) => {
      setSpreadsheetState((prevState) => {
        const updatedPageAndDataTablesData =
          prevState.pageAndDataTablesData.map((item) => {
            if (item.navItemId === navItemId) {
              return {
                ...item,
                text,
                dataTableData,
              };
            }
            return item;
          });

        const existingIndex = updatedPageAndDataTablesData.findIndex(
          (item) => item.navItemId === navItemId,
        );

        if (existingIndex === -1) {
          updatedPageAndDataTablesData.push({
            navItemId,
            text,
            textVariant: 'body1',
            textColor: theme.palette.textCustom.TEXT_HIGH_EMPHASIS,
            dataTableData,
          });
        }

        return {
          ...prevState,
          pageAndDataTablesData: updatedPageAndDataTablesData,
        };
      });
    },
    [],
  );

  const setCurrActiveSpreadsheetId = useCallback(
    (id: number) => {
      setSpreadsheetState((prevState) => ({
        ...prevState,
        currActiveSpreadsheetId: id,
      }));
    },
    [setSpreadsheetState],
  );

  const setActivePageTitle = useCallback((title: string) => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      activePageTitle: title,
    }));
  }, []);
  const clearSpreadsheetsData = useCallback(() => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      navPageDataTablesData: [],
      spreadsheetsData: null,
    }));
  }, []);
  const setActivePageId = useCallback((pageId: number) => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      activePageId: pageId,
    }));
  }, []);

  const setCurrSelectedCell = useCallback((cell: [string, string]) => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      currSelectedCell: cell,
    }));
  }, []);

  const setSelectedSpreadsheetRange = useCallback(
    (range: RangeSelection | null) => {
      setSpreadsheetState((prevState) => ({
        ...prevState,
        selectedSpreadsheetRange: range,
      }));
    },
    [],
  );

  const setActiveCell = useCallback((cell: Point | null) => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      activeCell: cell,
    }));
  }, []);

  const setModifiedData = useCallback(
    (data: Matrix<{ value: string }> | null) => {
      setSpreadsheetState((prevState) => ({
        ...prevState,
        modifiedData: data,
      }));
    },
    [],
  );

  const setModifiedValue = useCallback((value: string) => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      modifiedValue: value,
    }));
  }, []);

  const setSelectedChartType = useCallback((value: string) => {
    setSpreadsheetState((prevState) => ({
      ...prevState,
      selectedChartType: value,
    }));
  }, []);

  const setSelectedCharts = useCallback(
    (
      value: string,
      range: RangeSelection | null,
      dataKeys: any[],
      chartData: any[],
      chartLabels: ChartLabel[],
      id?: string,
    ) => {
      setSpreadsheetState((prevState) => {
        let updatedCharts;
        if (id) {
          updatedCharts = (prevState.selectedCharts || []).map((chart) =>
            chart.id === id
              ? {
                  ...chart,
                  value,
                  rangeSelection: range,
                  dataKeys,
                  chartData,
                  chartLabels,
                }
              : chart,
          );
        } else {
          updatedCharts = [
            ...(prevState.selectedCharts || []),
            {
              id: uuidv4(),
              value,
              rangeSelection: range,
              dataKeys,
              chartData,
              chartLabels,
            },
          ];
        }

        return {
          ...prevState,
          selectedCharts: updatedCharts,
        };
      });
    },
    [],
  );
  const setNavPageDataTableData = useCallback(
    (
      navItemId: string,
      textVariant: TypographyVarient,
      text: string,
      pageSectionData: PageSectionType[],
      textColor?: string,
    ) => {
      setSpreadsheetState((prevState) => {
        const updatedNavPageDataTablesData = (
          prevState.navPageDataTablesData || []
        ).map((item) => {
          if (item.navItemId === navItemId) {
            return {
              ...item,
              textVariant,
              text,
              pageSectionData,
              textColor,
            };
          }
          return item;
        });
        const existingIndex = updatedNavPageDataTablesData.findIndex(
          (item) => item.navItemId === navItemId,
        );

        if (existingIndex === -1) {
          updatedNavPageDataTablesData.push({
            navItemId,
            textVariant,
            text,
            pageSectionData,
            textColor,
          });
        }
        return {
          ...prevState,
          navPageDataTablesData: updatedNavPageDataTablesData,
        };
      });
    },
    [setSpreadsheetState],
  );

  const setSpreadsheetsData = useCallback(
    (title: string, data: Matrix<{ value: string }>, id?: string) => {
      setSpreadsheetState((prevState) => {
        if (!data || data.length === 0) {
          return prevState;
        }

        let updatedSpreadsheetsData;
        const existingSpreadsheetIndex = (
          prevState.spreadsheetsData || []
        ).findIndex((spreadsheet) => spreadsheet.id === id);

        if (existingSpreadsheetIndex !== -1) {
          updatedSpreadsheetsData = [...(prevState.spreadsheetsData || [])];
          updatedSpreadsheetsData[existingSpreadsheetIndex] = {
            ...updatedSpreadsheetsData[existingSpreadsheetIndex],
            title,
            data,
          };
        } else {
          updatedSpreadsheetsData = [
            ...(prevState.spreadsheetsData || []),
            {
              id,
              title,
              data,
            },
          ];
        }

        return {
          ...prevState,
          spreadsheetsData: updatedSpreadsheetsData,
        };
      });
    },
    [setSpreadsheetState],
  );

  const contextValue = useMemo(
    () => ({
      spreadsheetState,
      setCurrSelectedCell,
      setSelectedSpreadsheetRange,
      setActiveCell,
      setModifiedData,
      setModifiedValue,
      setSelectedChartType,
      setSelectedCharts,
      setSpreadsheetsData,
      setNavPageDataTableData,
      setActivePageId,
      clearSpreadsheetsData,
      setActivePageTitle,
      setCurrActiveSpreadsheetId,
      setPageAndDataTablesData,
      setCurrActiveSpreadsheetTitle,
      clearPageAndDataTableData,
    }),
    [
      spreadsheetState,
      setCurrSelectedCell,
      setSelectedSpreadsheetRange,
      setActiveCell,
      setModifiedData,
      setModifiedValue,
      setSelectedChartType,
      setSelectedCharts,
      setSpreadsheetsData,
      setNavPageDataTableData,
      setActivePageId,
      clearSpreadsheetsData,
      setActivePageTitle,
      setCurrActiveSpreadsheetId,
      setPageAndDataTablesData,
      setCurrActiveSpreadsheetTitle,
      clearPageAndDataTableData,
    ],
  );
  return (
    <SpreadsheetContext.Provider value={contextValue}>
      {children}
    </SpreadsheetContext.Provider>
  );
};
