import { screen, render, fireEvent } from '@testing-library/react';
import {
  SPREADSHEET_DUMMY_DATA,
  SPREADSHEET_TITLE_PLACEHOLDER,
  SPREADSHEET_TITLE_WRAPPER,
} from 'utils/constants';
import '@testing-library/jest-dom';
import Spreadhsheet from '.';
import { ChangeEvent, KeyboardEvent } from 'react';

describe('Spreadsheet component', () => {
  const mockToggleAiAnalyst = jest.fn();
  const mockHandleEditMode = jest.fn();
  const mockonDataTableNameChange = jest.fn();
  const mockhandleKeyDown = jest.fn();
  it('displays correct data in cells', () => {
    render(
      <Spreadhsheet
        data={SPREADSHEET_DUMMY_DATA}
        dataTableName="Table 1"
        toggleAIAnalyst={mockToggleAiAnalyst}
        id="1"
        title="Table 1"
        editMode={false}
        handleEditMode={mockHandleEditMode}
        onDataTableNameChange={mockonDataTableNameChange}
        handleKeyDown={mockhandleKeyDown}
      />,
    );

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Clicks')).toBeInTheDocument();
  });
  it('applies dynamic styling on range selection', () => {
    render(
      <Spreadhsheet
        data={SPREADSHEET_DUMMY_DATA}
        dataTableName="Table 1"
        toggleAIAnalyst={mockToggleAiAnalyst}
        id="1"
        title="Table 1"
        editMode={false}
        handleEditMode={mockHandleEditMode}
        onDataTableNameChange={mockonDataTableNameChange}
        handleKeyDown={mockhandleKeyDown}
      />,
    );

    const cellA1 = screen.getByText('320');

    fireEvent.click(cellA1);
    fireEvent.mouseDown(cellA1);
    fireEvent.mouseOver(screen.getByText('Spend'));
  });
  it('updates data on cell modification', () => {
    render(
      <Spreadhsheet
        data={SPREADSHEET_DUMMY_DATA}
        dataTableName="Table 1"
        toggleAIAnalyst={mockToggleAiAnalyst}
        id="1"
        title="Table 1"
        editMode={false}
        handleEditMode={mockHandleEditMode}
        onDataTableNameChange={mockonDataTableNameChange}
        handleKeyDown={mockhandleKeyDown}
      />,
    );
    const cellA1 = screen.getByText('320');

    fireEvent.click(cellA1);
    fireEvent.doubleClick(cellA1);
    const editedSpan = screen.getByText('320');
    editedSpan.textContent = '321';
    expect(screen.getByText('321')).toBeInTheDocument();
  });
});
