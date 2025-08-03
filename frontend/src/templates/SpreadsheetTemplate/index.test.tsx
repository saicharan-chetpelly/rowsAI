import React from 'react';
import { screen, render } from '@testing-library/react';
import SpreadsheetTemplate from '.';
import '@testing-library/jest-dom';

describe('tests for the Spreadsheet template', () => {
  test('should render the Spreadsheet template', () => {
    render(
      <SpreadsheetTemplate sideNav="nav" header="header" bodyContent="body" />,
    );
    const template = screen.getByTestId('spreadsheet-template');
    expect(template).toBeInTheDocument();
  });
});
