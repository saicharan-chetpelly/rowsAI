import {
  screen,
  render,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DEFAULT_NAVBAR_TESTID,
  DEFAULT_NAV_DATA,
  DEFAULT_NAV_FOOTER_DATA,
  DEFAULT_USER_NAME,
  PAGE_NAVBAR_TESTID,
  PAGE_NAV_ITEM_DATA,
  SPREADSHEET_TITLE_PLACEHOLDER,
  SPREADSHEET_USER_PROFILE,
} from 'utils/constants';
import { MemoryRouter } from 'react-router-dom';
import DefaultNavbar from './defaultNavbar';
import PageNavbar from './pageNavbar';
import Navbar from '.';
import * as services from 'services';

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
    title: 'Untitled 18',
    id: 91,
    createdAt: '2024-04-14T05:43:22',
    updatedAt: '2024-04-14T06:35:19',
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
    method: 'patch',
    url: '/spreadsheets/91',
    data: '{"title":"Untitled 18"}',
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
jest
  .spyOn(services, 'getAllSpreadsheets')
  .mockResolvedValue(mockGetAllSpreadsheetsResponse as any);
describe('DefaultNavbar Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should render DefaultNavbar component with navbar data provided as props', async () => {
    await act(async () => {
      render(<DefaultNavbar activePageTitle="home" />);
    });

    const username = screen.getByText(DEFAULT_USER_NAME);
    expect(username).toBeInTheDocument();
  });
  test('should not set active page when clicked again clicked on home tab', async () => {
    await act(async () => {
      render(<DefaultNavbar activePageTitle="home" />);
    });
    const homepage = screen.getByTestId('navItem-Home');
    fireEvent.click(homepage);
  });
  test('should update active state when clicked on any of nav item', async () => {
    await act(async () => {
      render(<DefaultNavbar activePageTitle="home" />);
    });
    const mySpreadsheetsNavItem = screen.getByText('My Spreadsheets');
    fireEvent.click(mySpreadsheetsNavItem);
  });
});
jest
  .spyOn(services, 'getSpreadsheetById')
  .mockResolvedValue(mockGetSpreadsheetByIdResponse as any);
jest
  .spyOn(services, 'updateSpreadsheetTitleById')
  .mockResolvedValue(mockupdateSpreadsheetTitleByIdResponse as any);
jest
  .spyOn(services, 'getAllSpreadsheets')
  .mockResolvedValue(mockGetAllSpreadsheetsResponse as any);
describe('PageNavBar component', () => {
  const mockSetOnDataState = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    global.gc && global.gc();
  });
  test('should render PageNavBar component', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PageNavbar
            activePage="page1"
            setDataState={mockSetOnDataState}
            pageNavItemData={PAGE_NAV_ITEM_DATA}
          />
        </MemoryRouter>,
      );
    });
    await waitFor(() => {
      screen.getByText('Page 1');
    });
    const pageNavBar = screen.getByText('Page 1');
    expect(pageNavBar).toBeInTheDocument();
  });
  test('should open textfiled when double click on spreadhseet name to edit', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PageNavbar
            activePage="page1"
            setDataState={mockSetOnDataState}
            pageNavItemData={PAGE_NAV_ITEM_DATA}
          />
        </MemoryRouter>,
      );
    });
    await waitFor(() => {
      screen.getByTestId(SPREADSHEET_USER_PROFILE);
    });
    const spreadsheetName = screen.getByTestId(SPREADSHEET_USER_PROFILE);
    fireEvent.dblClick(spreadsheetName);
    const inputElement = screen.getByPlaceholderText(
      SPREADSHEET_TITLE_PLACEHOLDER,
    );
    fireEvent.change(inputElement, { target: { value: 'Spreadsheet1' } });
    fireEvent.keyDown(inputElement, { key: 'Escape' });
    fireEvent.keyDown(inputElement, { key: 'Enter' });
  });
  test('should open accordion for page2 and select the chart2', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PageNavbar
            activePage="page1"
            setDataState={mockSetOnDataState}
            pageNavItemData={PAGE_NAV_ITEM_DATA}
          />
        </MemoryRouter>,
      );
    });
    await waitFor(() => {
      screen.getByText('Page 1');
    });
    const page2 = screen.getByText('Page 1');
    fireEvent.click(page2);
    await waitFor(() => {
      screen.getAllByText('Table 1');
    });
    const chart2 = screen.getAllByText('Table 1');
    fireEvent.click(chart2[0]);
  });
  test('should close all accordions', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PageNavbar
            activePage="page1"
            setDataState={mockSetOnDataState}
            pageNavItemData={PAGE_NAV_ITEM_DATA}
          />
        </MemoryRouter>,
      );
    });
    await waitFor(() => {
      screen.getByText('Page 2');
    });
    const page2 = screen.getByText('Page 2');
    fireEvent.click(page2);
    await waitFor(() => {
      screen.getAllByText('Table 1');
    });
    const chart2 = screen.getAllByText('Table 1');
    fireEvent.click(chart2[0]);
    fireEvent.click(page2);
  });
});
jest
  .spyOn(services, 'getSpreadsheetById')
  .mockResolvedValue(mockGetSpreadsheetByIdResponse as any);
jest
  .spyOn(services, 'updateSpreadsheetTitleById')
  .mockResolvedValue(mockupdateSpreadsheetTitleByIdResponse as any);
describe('Navbar component', () => {
  const mockSetOnDataState = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    global.gc && global.gc();
  });
  test('should render default Navbar component', async () => {
    await act(async () => {
      render(
        <Navbar
          variant="default"
          activePage="home"
          navData={DEFAULT_NAV_DATA}
          navFooterData={DEFAULT_NAV_FOOTER_DATA}
          setDataState={mockSetOnDataState}
        />,
      );
    });

    expect(screen.getByTestId(DEFAULT_NAVBAR_TESTID)).toBeInTheDocument();
  });
  test('should render page Navbar component', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Navbar
            variant="page"
            activePage="Page1"
            pageNavItemData={PAGE_NAV_ITEM_DATA}
            setDataState={mockSetOnDataState}
          />
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId(PAGE_NAVBAR_TESTID)).toBeInTheDocument();
  });
});
