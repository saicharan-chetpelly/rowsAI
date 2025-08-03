import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import theme from 'theme';
import * as services from 'services';
import {
  AI_ANALYST_ICON_ALT_TITLE,
  ANALYST_TEXTFIELD_PLACEHOLER_TEXT,
  CHART_SELECT_MENU_OPTIONS_DATA,
  DATA_ACTION_IMPORT_INPUT_TESTID,
  IMPORT_FILE_BUTTON_TESTID,
  SPREADSHEET_TITLE_PLACEHOLDER,
  SPREADSHEET_TITLE_WRAPPER,
} from 'utils/constants';
import EditSpreadSheetPage from '.';

jest.mock('react-router-dom');
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('utils/ThemeContext', () => ({
  useSpreadsheetContext: () => ({
    spreadsheetState: {
      selectedCharts: [
        {
          id: 1,
          dataKeys: ['A', 'B', 'C'],
          value: 'line_chart',
          chartData: [10, 20, 30],
        },
        {
          id: 2,
          dataKeys: ['D', 'E', 'F'],
          value: 'bar_chart',
          chartData: [50, 60, 70],
        },
      ],
      currSelectedCell: ['Row Info', 'Col Info'],
      spreadsheetsData: [
        {
          id: '1',
          data: [],
          title: 'Table1',
        },
      ],
      selectedSpreadsheetRange: {
        start: { row: 1, column: 1 },
        end: { row: 3, column: 3 },
      },
      showChartEditor: true,
      activePageId: 118,
      activePageTitle: 'Page 1',
      pageAndDataTablesData: [
        {
          navItemId: '118',
          text: 'Page 1',
          textVariant: 'body1',
          textColor: '#1A1A1A',
          dataTableData: [
            {
              id: '117',
              data: [
                [
                  {
                    value: 'CODE',
                  },
                  {
                    value: 'SYMBOL',
                  },
                  {
                    value: 'NAME',
                  },
                ],
                [
                  {
                    value: 'AED',
                  },
                  {
                    value: 'د.إ',
                  },
                  {
                    value: 'United Arab Emirates d',
                  },
                ],
              ],
              title: 'currency',
            },
          ],
        },
      ],
    },
    setSelectedCharts: jest.fn(),
    setSelectedChartType: jest.fn(),
    setSpreadsheetsData: jest.fn(),
    clearPageAndDataTableData: jest.fn(),
    setActivePageId: jest.fn(),
    setActivePageTitle: jest.fn(),
    setCurrActiveSpreadsheetId: jest.fn(),
    setCurrActiveSpreadsheetTitle: jest.fn(),
    setPageAndDataTablesData: jest.fn(),
    clearSpreadsheetsData: jest.fn(),
  }),
}));
const mockgetPagesBySpreadsheetIdResponse = {
  data: [
    {
      title: 'Page 1',
      id: 118,
      createdAt: '2024-04-14T05:43:35',
      updatedAt: '2024-04-14T05:43:35',
      spreadsheet_id: 91,
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '117',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://3.15.208.83:30012/api/v1',
    method: 'get',
    url: '/spreadsheets/91/pages',
  },
  request: {},
};
const mockgetDataTablesByPageIdResponse = {
  data: [
    {
      snowflake_table_name: 't100A4606_A_CURRENCY',
      id: 117,
      updatedAt: '2024-04-14T05:43:37',
      table_name: 'currency',
      createdAt: '2024-04-14T05:43:37',
      page_id: 118,
      file_content: [
        {
          CODE: 'AED',
          SYMBOL: 'د.إ',
          NAME: 'United Arab Emirates d',
        },
        {
          CODE: 'AFN',
          SYMBOL: '؋',
          NAME: 'Afghan afghani',
        },
        {
          CODE: 'ALL',
          SYMBOL: 'L',
          NAME: 'Albanian lek',
        },
        {
          CODE: 'AMD',
          SYMBOL: 'AMD',
          NAME: 'Armenian dram',
        },
      ],
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '9112',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://3.15.208.83:30012/api/v1',
    method: 'get',
    url: '/data-table/pages/118',
  },
  request: {},
};
const mockGetSpreadsheetByIdResponse = {
  data: {
    title: 'Untitled 12',
    id: 91,
    createdAt: '2024-04-14T05:43:22',
    updatedAt: '2024-04-14T05:43:22',
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '99',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://3.15.208.83:30012/api/v1',
    method: 'get',
    url: '/spreadsheets/91',
  },
  request: {},
};
const mockGetAllSpreadsheetsResponse = {
  data: [
    {
      title: 'updated spreadshew',
      id: 1,
      createdAt: '2024-03-28T08:00:00',
      updatedAt: '2024-04-14T05:35:53',
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '1262',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://3.15.208.83:30012/api/v1',
    method: 'get',
    url: '/spreadsheets',
  },
  request: {},
};

const mockFetchAllPagesResponse = {
  data: [
    {
      id: 2,
      title: 'Page 2',
      createdAt: '2024-04-07T09:00:00',
      updatedAt: '2024-04-07T09:00:00',
      spreadsheet_id: 1,
    },
  ],
  status: 201,
  statusText: 'CREATED',
};

const mockCreateNewPageResponse = {
  data: [
    {
      id: 1,
      title: 'Page 1',
      createdAt: '2024-04-15T04:58:52.787Z',
      updatedAt: '2024-04-15T04:58:52.787Z',
      spreadsheet_id: 1,
    },
  ],
  status: 200,
  statusText: 'OK',
};

const mockUploadNewFileResponse = {
  data: [
    {
      id: 1,
      table_name: 'user_info',
      createdAt: '2024-04-15T05:01:50.250Z',
      updatedAt: '2024-04-15T05:01:50.250Z',
      snowflake_table_name: 'snowflake_user_info',
      page_id: 1,
    },
  ],
  status: 201,
  statusText: 'CREATED',
};

const mockUpdateDataTableTitleResponse = {
  data: [
    {
      id: 1,
      table_name: 'Updated UserInfo',
      createdAt: '2024-04-15T05:01:50.250Z',
      updatedAt: '2024-04-15T05:01:50.250Z',
      snowflake_table_name: 'snowflake_user_info',
      page_id: 1,
    },
  ],
  status: 200,
  statusText: 'OK',
};
const mockFetchAllDeepDives = {
  data: [
    {
      query: 'SELECT * FROM T100A4606_A_CURRENCY ORDER BY NAME DESC LIMIT 5;',
      label: 'Top 5 currencies by name',
      id: 81,
      data_table_id: 117,
    },
    {
      query: "SELECT * FROM T100A4606_A_CURRENCY WHERE SYMBOL LIKE 'USD%';",
      label: "Currencies with symbols starting with 'USD'",
      id: 82,
      data_table_id: 117,
    },
    {
      query: "SELECT * FROM T100A4606_A_CURRENCY WHERE CODE LIKE '%EUR%';",
      label: "Currencies with codes containing 'EUR'",
      id: 83,
      data_table_id: 117,
    },
    {
      query: 'SELECT DISTINCT CODE FROM T100A4606_A_CURRENCY;',
      label: 'Distinct currency codes',
      id: 84,
      data_table_id: 117,
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '565',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://127.0.0.1:8000/api/v1',
    method: 'post',
    url: 'spreadsheets/91/pages/118/data-tables/117/deep-dives',
  },
  request: {},
};
const mockFetchAllQuickInsights = {
  data: [
    {
      label: 'The most common currency code in the dataset is AED',
      id: 191,
      data_table_id: 117,
    },
    {
      label:
        'The average length of currency names in the dataset is 15 characters.',
      id: 192,
      data_table_id: 117,
    },
    {
      label: 'The number of unique currency names in the dataset is 163',
      id: 193,
      data_table_id: 117,
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '304',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://127.0.0.1:8000/api/v1',
    method: 'post',
    url: 'spreadsheets/91/pages/118/data-tables/117/quick-insights',
  },
  request: {},
};
const mockGetDataTableById = {
  data: {
    id: 117,
    table_name: 'currency',
    createdAt: '2024-04-14T05:43:37',
    page_id: 118,
    snowflake_table_name: 't100A4606_A_CURRENCY',
    updatedAt: '2024-04-14T05:43:37',
    file_content: [
      {
        CODE: 'AED',
        SYMBOL: 'د.إ',
        NAME: 'United Arab Emirates d',
      },
      {
        CODE: 'AFN',
        SYMBOL: '؋',
        NAME: 'Afghan afghani',
      },
      {
        CODE: 'ALL',
        SYMBOL: 'L',
        NAME: 'Albanian lek',
      },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '9110',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://127.0.0.1:8000/api/v1',
    method: 'get',
    url: '/data-table/117',
  },
  request: {},
};
const mockGetDeepdiveDataTableContent = {
  data: {
    file_content: [
      {
        CODE: 'ZMW',
        SYMBOL: 'ZK',
        NAME: 'Zambian kwacha',
      },
      {
        CODE: 'YER',
        SYMBOL: '﷼',
        NAME: 'Yemeni rial',
      },
      {
        CODE: 'XOF',
        SYMBOL: 'CFA',
        NAME: 'West African CFA franc',
      },
      {
        CODE: 'VND',
        SYMBOL: '₫',
        NAME: 'Vietnamese đồng',
      },
      {
        CODE: 'VEF',
        SYMBOL: 'Bs F',
        NAME: 'Venezuelan bolívar',
      },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '302',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://127.0.0.1:8000/api/v1',
    method: 'get',
    url: '/deep-dives/SELECT * FROM T100A4606_A_CURRENCY ORDER BY NAME DESC LIMIT 5;',
  },
  request: {},
};
const mockPostUserQuery = {
  data: {
    query: 'What is the age of Lisa Mills?',
    id: 52,
    createdAt: '2024-04-15T07:23:39',
    data_table_id: 117,
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '104',
    'content-type': 'application/json',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://3.15.208.83:30012/api/v1',
    method: 'post',
    url: '/user-query?datatable_id=127&table_name=t29E8024C_7_SALARIES&user_question=What is the age of Lisa Mills?',
  },
  request: {},
};
describe('EditSpreadSheetPage Component', () => {
  jest
    .spyOn(services, 'getPagesBySpreadsheetId')
    .mockResolvedValue(mockgetPagesBySpreadsheetIdResponse as any);
  jest
    .spyOn(services, 'getDataTablesByPageId')
    .mockResolvedValue(mockgetDataTablesByPageIdResponse as any);
  jest
    .spyOn(services, 'getSpreadsheetById')
    .mockResolvedValue(mockGetSpreadsheetByIdResponse as any);
  jest
    .spyOn(services, 'getAllSpreadsheets')
    .mockResolvedValue(mockGetAllSpreadsheetsResponse as any);
  jest
    .spyOn(services, 'fetchAllDeepDives')
    .mockResolvedValue(mockFetchAllDeepDives as any);
  jest
    .spyOn(services, 'fetchAllQuickInsights')
    .mockResolvedValue(mockFetchAllQuickInsights as any);
  jest
    .spyOn(services, 'getDataTableById')
    .mockResolvedValue(mockGetDataTableById as any);
  jest
    .spyOn(services, 'getDeepdiveDataTableContent')
    .mockResolvedValue(mockGetDeepdiveDataTableContent as any);
  jest
    .spyOn(services, 'postUserQuery')
    .mockResolvedValue(mockPostUserQuery as any);
  test('should renders without errors', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);
    render(<EditSpreadSheetPage />);
    await act(async () => {});
    fireEvent.click(screen.getByAltText('row-logo-icon'));
    expect(ReactRouterDom.useNavigate).toHaveBeenCalled();
  });

  test('should navigate to view spreadsheet page', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);
    render(<EditSpreadSheetPage />);
    await act(async () => {});

    fireEvent.click(screen.getByText('View'));
    expect(ReactRouterDom.useNavigate).toHaveBeenCalled();
  });

  test('should toggles sidebar visibility when icon is clicked', async () => {
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);
    const { getByAltText } = render(<EditSpreadSheetPage />);
    await act(async () => {});
    const sidebarIcon = getByAltText('hide icon');
    fireEvent.click(sidebarIcon);
    expect(sidebarIcon).toBeInTheDocument();
  });

  test('should toggles showDataActions state when handleDataActions is called', async () => {
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);

    jest
      .spyOn(services, 'fetchAllPages')
      .mockResolvedValue(mockFetchAllPagesResponse as any);

    jest
      .spyOn(services, 'createNewPage')
      .mockResolvedValue(mockCreateNewPageResponse as any);

    jest
      .spyOn(services, 'uploadNewFile')
      .mockResolvedValue(mockUploadNewFileResponse as any);

    await act(async () => {
      render(<EditSpreadSheetPage />);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Data Actions'));
      expect(screen.getByText('Import file')).toBeInTheDocument();
    });

    const importFileButton = screen.getByTestId(IMPORT_FILE_BUTTON_TESTID);
    fireEvent.click(importFileButton);

    const fileInput = screen.getByTestId(DATA_ACTION_IMPORT_INPUT_TESTID);
    const fakeCSVFile = new File(['content'], 'example.csv', {
      type: '.csv',
    });
    fireEvent.change(fileInput, { target: { files: [fakeCSVFile] } });

    await waitFor(() => {
      fireEvent.click(importFileButton);
    });
  });

  test('toggles AI Analyst visibility when clicked', async () => {
    jest.useFakeTimers();
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);

    render(<EditSpreadSheetPage />);

    await act(async () => {});

    fireEvent.click(screen.getByTestId(AI_ANALYST_ICON_ALT_TITLE));
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(screen.getByText('AI Analyst')).toBeInTheDocument();
      expect(screen.getByText('Quick insights')).toBeInTheDocument();
      expect(screen.getByText('Deep dives')).toBeInTheDocument();
      const firstDeepdive = screen.getByTestId('deepdive-card-81');
      fireEvent.click(firstDeepdive);
    });
    expect(screen.getByText('Insert table')).toBeInTheDocument();
    const inserTTableMenuItem = screen.getByTestId('menuitem-testid-1');
    fireEvent.click(inserTTableMenuItem);
    expect(inserTTableMenuItem).not.toBeInTheDocument();
  });

  test('toggles chart editor visibility when "Chart" option is selected from "Insert" menu', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <EditSpreadSheetPage />,
      </ThemeProvider>,
    );
    await act(async () => {});
    expect(screen.getByText('Insert')).toBeInTheDocument();
    const insertMenuButton = getByText('Insert');
    fireEvent.click(insertMenuButton);
    expect(screen.getByText('Table')).toBeInTheDocument();
    const tableMenuButton = screen.getByAltText('table icon');
    fireEvent.click(tableMenuButton);
    fireEvent.click(insertMenuButton);
    const chartOption = screen.getByAltText('chart');
    fireEvent.click(chartOption);
    expect(screen.getByText('Chart Editor')).toBeInTheDocument();
    const closeIcon = screen.getByAltText('drawer-close-icon');
    fireEvent.click(closeIcon);
    expect(closeIcon).not.toBeInTheDocument();
  });

  it('should update selectedChartType when toggle chart select menu', async () => {
    jest.useFakeTimers();
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);

    render(
      <ThemeProvider theme={theme}>
        <EditSpreadSheetPage />
      </ThemeProvider>,
    );
    await act(async () => {});
    fireEvent.click(screen.getByTestId(AI_ANALYST_ICON_ALT_TITLE));
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(screen.getByText('AI Analyst')).toBeInTheDocument();
      const firstDeepdive = screen.getByTestId('deepdive-card-81');
      const secondDeepdive = screen.getByTestId('deepdive-card-82');
      fireEvent.click(secondDeepdive);
      const inserTTableMenuItem = screen.getByTestId('menuitem-testid-1');
      fireEvent.click(inserTTableMenuItem);
      fireEvent.click(firstDeepdive);
      fireEvent.click(inserTTableMenuItem);
    });

    const insertMenuButton = screen.getByText('Insert');
    fireEvent.click(insertMenuButton);
    const chartOption = screen.getByAltText('chart');
    fireEvent.click(chartOption);
    expect(screen.getByText('Chart Editor')).toBeInTheDocument();
    const selectElement = screen.getAllByRole('combobox');
    fireEvent.mouseDown(selectElement[0]);
    const optionElement = screen.getByText(
      CHART_SELECT_MENU_OPTIONS_DATA[1].label,
    );
    fireEvent.click(optionElement);
    expect(screen.getByText('Line Chart')).toBeInTheDocument();

    const optionBtn = screen.getAllByRole('button', { name: 'option-icon' });
    fireEvent.click(optionBtn[0] as HTMLElement);

    const deleteBtn = screen.getByAltText('delete-icon');
    fireEvent.click(deleteBtn);
    fireEvent.click(screen.getAllByAltText('edit-chart-icon')[0]);
    expect(deleteBtn).not.toBeInTheDocument();
  });

  it('should update the datatable title by onclick on it title', async () => {
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);

    jest
      .spyOn(services, 'updateDataTableTitle')
      .mockResolvedValue(mockUpdateDataTableTitleResponse as any);

    await act(async () => {
      render(<EditSpreadSheetPage />);
    });

    const dataTableTitle = screen.getByTestId(SPREADSHEET_TITLE_WRAPPER);
    fireEvent.doubleClick(dataTableTitle);

    const editDataTableInput = screen.getByPlaceholderText(
      SPREADSHEET_TITLE_PLACEHOLDER,
    );

    fireEvent.change(editDataTableInput, {
      target: { value: 'Updated UserInfo' },
    });

    fireEvent.keyDown(editDataTableInput, { key: 'Enter', keyCode: 13 });

    expect(editDataTableInput).toHaveValue('Updated UserInfo');
  });
  it('should handle user query ', async () => {
    jest.useFakeTimers();
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);
    await act(async () => {
      render(<EditSpreadSheetPage />);
    });
    await act(async () => {});
    fireEvent.click(screen.getByTestId(AI_ANALYST_ICON_ALT_TITLE));
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(screen.getByText('AI Analyst')).toBeInTheDocument();

      const userInputField = screen.getByPlaceholderText(
        ANALYST_TEXTFIELD_PLACEHOLER_TEXT,
      );
      fireEvent.change(userInputField, { target: { value: 'Test prompt' } });
      expect(userInputField).toHaveValue('Test prompt');
      fireEvent.keyDown(userInputField, { key: 'Escape' });
      fireEvent.keyDown(userInputField, { key: 'Enter' });
    });
    jest.clearAllTimers();
  });
});
