import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpreadsheetCard, { SpreadsheetCardProps } from '.';

const mockProps: SpreadsheetCardProps = {
  title: 'Test Spreadsheet',
  folder: 'Test Folder',
  lastModified: '2024-03-13',
  onClick: jest.fn(),
  onViewModeClick: jest.fn(),
  editMode: false,
  onEditMode: jest.fn(),
  onSheetNameChange: jest.fn(),
};

describe('SpreadsheetCard', () => {
  it('should renders with correct content', () => {
    const { getByText, getByAltText } = render(
      <SpreadsheetCard {...mockProps} />,
    );

    expect(getByText('Test Spreadsheet')).toBeInTheDocument();
    expect(getByText('In Test Folder')).toBeInTheDocument();
    expect(getByText('Modified 2024-03-13')).toBeInTheDocument();

    expect(getByAltText('spreadsheet-icon')).toBeInTheDocument();
    expect(getByAltText('eye-icon')).toBeInTheDocument();
    expect(getByAltText('option-icon')).toBeInTheDocument();
  });

  it('should handle onClickfor the card', () => {
    render(<SpreadsheetCard {...mockProps} editMode />);

    fireEvent.click(screen.getByTestId('Test Spreadsheet-spreadsheet-card'));

    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it('should redirect to the view mode when the eye icon is clicked', () => {
    const { getByTestId } = render(<SpreadsheetCard {...mockProps} />);

    fireEvent.click(getByTestId('Test Spreadsheet-view-button'));

    expect(mockProps.onViewModeClick).toHaveBeenCalled();
  });

  it('should calls onOptionClick when the option icon is clicked', () => {
    const { getByAltText } = render(<SpreadsheetCard {...mockProps} />);

    fireEvent.click(getByAltText('option-icon'));
  });
});
