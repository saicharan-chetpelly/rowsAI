import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  EDIT_TEXT,
  HIDE_SIDEBAR_ICON_ALT_TEXT,
  PAGE_NAV_ITEM_DATA,
  PAGE_TITLE,
} from 'utils/constants';
import ViewSpreadSheetPage from '.';
import * as ReactRouterDom from 'react-router-dom';
import theme from 'theme';
import * as services from 'services';

jest.mock('react-router-dom');
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
      pageAndDataTablesData: [
        {
          navItemId: '1',
          textVariant: 'body1',
          text: 'Page 1',
          textColor: '',
          dataTableData: [
            {
              id: '1',
              title: 'Table 1',
              data: [],
            },
            {
              id: '2',
              title: 'Table 2',
              data: [],
            },
          ],
        },
        {
          navItemId: '2',
          textVariant: 'body1',
          text: 'Page 2',
          textColor: '',
          dataTableData: [
            {
              id: '1',
              title: 'Chart11',
              data: [],
            },
            {
              id: '2',
              title: 'Chart22',
              data: [],
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
describe('ViewSpreadSheetPage', () => {
  it('should renders with view option mode with title correctly', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);
    jest
      .spyOn(services, 'getPagesBySpreadsheetId')
      .mockResolvedValue(mockgetPagesBySpreadsheetIdResponse as any);
    jest
      .spyOn(services, 'getSpreadsheetById')
      .mockResolvedValue(mockGetSpreadsheetByIdResponse as any);
    jest
      .spyOn(services, 'getDataTablesByPageId')
      .mockResolvedValue(mockgetDataTablesByPageIdResponse as any);
    jest
      .spyOn(services, 'getAllSpreadsheets')
      .mockResolvedValue(mockGetAllSpreadsheetsResponse as any);
    render(<ViewSpreadSheetPage />);
    expect(screen.getByText(EDIT_TEXT)).toBeInTheDocument();
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByAltText(HIDE_SIDEBAR_ICON_ALT_TEXT)).toBeInTheDocument();
  });

  it('should toggles sidebar visibility on button click', async () => {
    const { getByAltText } = render(<ViewSpreadSheetPage />);
    await act(async () => {});
    const toggleSidebarButton = getByAltText(HIDE_SIDEBAR_ICON_ALT_TEXT);
    fireEvent.click(toggleSidebarButton);
  });

  it('should enable the edit mode on click on edit button', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);
    const { getByText } = render(<ViewSpreadSheetPage />);
    await act(async () => {});
    const editButton = getByText(EDIT_TEXT);
    fireEvent.click(editButton);
  });
  it('should navigate to homepage when clicked on logo', async () => {
    const navigate = jest.fn();
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(navigate);
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue({
      state: true,
    } as any);
    const { getByAltText } = render(<ViewSpreadSheetPage />);
    await act(async () => {});
    fireEvent.click(getByAltText('row-logo-icon'));
    expect(ReactRouterDom.useNavigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
