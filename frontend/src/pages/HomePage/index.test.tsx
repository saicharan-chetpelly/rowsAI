import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SHEET_RENAME_PLACEHOLDER } from 'utils/constants';
import HomePage from '.';
import * as ReactRouterDom from 'react-router-dom';
import * as services from 'services';

const mockGetAllSpreadsheetsResponse = {
  data: [
    {
      title: 'Finance Report Q4:23',
      id: 1,
      createdAt: '2024-03-28T08:00:00',
      updatedAt: '2024-04-14T05:35:53',
    },
    {
      title: 'Finance Report Q4:25',
      id: 2,
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
const mockSetSpreasheets = [
  {
    id: '1',
    title: 'Finance Report Q4:23',
    categoryType: 'Health',
    lastModified: '7 hours ago',
    updatedAt: '2024-04-14T05:35:53',
  },
  {
    id: '2',
    title: 'Finance Report Q4:25',
    categoryType: 'Health',
    lastModified: '7 hours ago',
    updatedAt: '2024-04-14T05:35:53',
  },
];
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
const mockupdateSpreadsheetTitleByIdResponse = {
  data: {
    title: 'Untitled 187u',
    id: 91,
    createdAt: '2024-04-14T05:43:22',
    updatedAt: '2024-04-14T07:49:41',
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '101',
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
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://3.15.208.83:30012/api/v1',
    method: 'patch',
    url: '/spreadsheets/91',
    data: '{"title":"Untitled 187u"}',
  },
  request: {},
};
const mockcreateNewSpreadsheetResponse = {
  data: {
    title: 'Untitled 13',
    id: 92,
    createdAt: '2024-04-14T09:15:51',
    updatedAt: '2024-04-14T09:15:51',
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
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://3.15.208.83:30012/api/v1',
    method: 'post',
    url: '/spreadsheets',
    data: '{"title":"Untitled 13"}',
  },
  request: {},
};
jest.mock('react-router-dom');
describe('HomePage', () => {
  jest
    .spyOn(services, 'getAllSpreadsheets')
    .mockResolvedValue(mockGetAllSpreadsheetsResponse as any);
  jest
    .spyOn(services, 'getSpreadsheetById')
    .mockResolvedValue(mockGetSpreadsheetByIdResponse as any);
  jest
    .spyOn(services, 'updateSpreadsheetTitleById')
    .mockResolvedValue(mockupdateSpreadsheetTitleByIdResponse as any);
  jest
    .spyOn(services, 'createNewSpreadsheet')
    .mockResolvedValue(mockcreateNewSpreadsheetResponse as any);
  it('should renders correctly', async () => {
    const { getByTestId } = render(<HomePage />);
    await act(async () => {});
    expect(getByTestId('sidebar')).toBeInTheDocument();
    expect(getByTestId('content-box')).toBeInTheDocument();
  });

  it('should go to the previous page when row logo is clicked', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    const { getByAltText } = render(<HomePage />);
    await act(async () => {});
    fireEvent.click(getByAltText('row-logo-icon'));
  });

  it('should calls redirect to the create spreadsheet page when create option is clicked', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    const { getByTestId } = render(<HomePage />);
    await act(async () => {});
    const createSpreadSheetBtn = getByTestId('create-button-testid');
    fireEvent.click(createSpreadSheetBtn);
  });

  it('should redirect to the spreadsheet page when a spreadsheet card is clicked', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    render(<HomePage />);
    await act(async () => {});
    fireEvent.click(screen.getByTestId('spreadsheet-card'));
  });

  it('should redirect to the spreadsheet view mode when a spreadsheet card is clicked', async () => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
    const { getAllByAltText } = render(<HomePage />);
    await act(async () => {});
    const viewModeButton = getAllByAltText('eye-icon');
    fireEvent.click(viewModeButton[0]);
  });

  it('should enable the edit mode and render a textfield when a spreadsheet card is clicked', async () => {
    const { getByPlaceholderText, getByTestId } = render(<HomePage />);
    await act(async () => {});

    const viewModeButton = getByTestId('Finance Report Q4:23-edit-button');
    fireEvent.click(viewModeButton);

    const sheetRenameField = getByPlaceholderText(SHEET_RENAME_PLACEHOLDER);
    expect(sheetRenameField).toBeInTheDocument();

    const newSheetName = 'Updated Sheet Name';
    fireEvent.change(sheetRenameField, { target: { value: newSheetName } });
    fireEvent.keyDown(sheetRenameField, { key: 'Escape' });
    fireEvent.keyDown(sheetRenameField, { key: 'Enter' });
    expect(sheetRenameField).toHaveValue(newSheetName);
  });
});
