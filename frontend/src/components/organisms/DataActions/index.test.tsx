import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import {
  DATA_ACTION_IMPORT_INPUT_TESTID,
  DATA_ACTIONS_TITLE,
  IMPORT_DATA,
  IMPORT_FILE_BUTTON_TESTID,
  SEARCH_ACTIONS_PLACEHOLDER,
  SEND_DATA,
} from 'utils/constants';
import DataActions from '.';

const fileSampleData = `
Name, Age, Gender
John Doe, 30, Male
Jane Smith, 25, Female
Michael Johnson, 40, Male
Emily Brown, 35, Female
`;

class MockFileReader {
  onload: Function | null;
  result: string | null;

  constructor() {
    this.onload = null;
    this.result = null;
  }

  readAsBinaryString() {
    if (typeof this.onload === 'function') {
      this.onload({ target: { result: fileSampleData } });
    }
  }

  readAsText() {
    if (typeof this.onload === 'function') {
      this.onload({ target: { result: fileSampleData } });
    }
  }
}

const mockPapa = {
  parse: jest.fn((data, options) => {
    if (options.complete) {
      options.complete({ data: 'mocked CSV data' });
    }
  }),
};

(global as any).FileReader = jest.fn(() => new MockFileReader());
(global as any).Papa = mockPapa;
const mockToggleDataActions = jest.fn();
const mockCreatePageAndUploadFile = jest.fn();
describe('DataActions component', () => {
  test('should renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <DataActions
        open
        toggleDataActions={mockToggleDataActions}
        createPageAndUploadFile={mockCreatePageAndUploadFile}
      />,
    );

    const searchActionInput = getByPlaceholderText(SEARCH_ACTIONS_PLACEHOLDER);
    const importOption = getByText(IMPORT_DATA);
    const sendDataOption = getByText(SEND_DATA);
    const dataActionTitle = getByText(DATA_ACTIONS_TITLE);

    expect(searchActionInput).toBeInTheDocument();
    expect(importOption).toBeInTheDocument();
    expect(sendDataOption).toBeInTheDocument();
    expect(dataActionTitle).toBeInTheDocument();
  });

  test('should handles change action', () => {
    const { getByPlaceholderText } = render(
      <DataActions
        open
        toggleDataActions={mockToggleDataActions}
        createPageAndUploadFile={mockCreatePageAndUploadFile}
      />,
    );

    const sampleInput = 'test action';
    const searchActionInput = getByPlaceholderText(SEARCH_ACTIONS_PLACEHOLDER);
    fireEvent.change(searchActionInput, { target: { value: sampleInput } });

    expect(searchActionInput).toHaveValue(sampleInput);
  });

  test('should handle xlsx file import', async () => {
    const { getByTestId } = render(
      <DataActions
        open
        toggleDataActions={mockToggleDataActions}
        createPageAndUploadFile={mockCreatePageAndUploadFile}
      />,
    );

    const importFileButton = getByTestId(IMPORT_FILE_BUTTON_TESTID);
    fireEvent.click(importFileButton);

    const fileInput = getByTestId(DATA_ACTION_IMPORT_INPUT_TESTID);
    const fakeFile = new File([fileSampleData], 'example1.xlsx', {
      type: '.xlsx',
    });
    fireEvent.change(fileInput, { target: { files: [fakeFile] } });
  });

  test('should handle csv file import', async () => {
    const { getByTestId } = render(
      <DataActions
        open
        toggleDataActions={mockToggleDataActions}
        createPageAndUploadFile={mockCreatePageAndUploadFile}
      />,
    );

    const importFileButton = getByTestId(IMPORT_FILE_BUTTON_TESTID);
    fireEvent.click(importFileButton);

    const fileInput = getByTestId(DATA_ACTION_IMPORT_INPUT_TESTID);
    const fakeFile = new File([fileSampleData], 'example1.csv', {
      type: '.csv',
    });
    fireEvent.change(fileInput, { target: { files: [fakeFile] } });
  });

  test('should close the data action drawer on click close button', () => {
    const { getByRole } = render(
      <DataActions
        open
        toggleDataActions={mockToggleDataActions}
        createPageAndUploadFile={mockCreatePageAndUploadFile}
      />,
    );

    const draweerCloseButton = getByRole('img', {
      name: 'drawer-close-icon',
    });
    fireEvent.click(draweerCloseButton);
  });
});
