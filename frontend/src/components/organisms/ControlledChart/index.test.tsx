import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlledChart from '.';

const mockChartTitle = 'Test Chart';
const mockLabels = [
  { name: 'Label 1', color: '#FF0000' },
  { name: 'Label 2', color: '#00FF00' },
];
const mockChart = <div>Mock Chart</div>;
const mockChartModeChange = jest.fn();
const mockChartDelete = jest.fn();

describe('ControlledChart component', () => {
  beforeEach(() => {
    render(
      <ControlledChart
        chartTitle={mockChartTitle}
        labels={mockLabels}
        chart={mockChart}
        onChartModeChange={mockChartModeChange}
        onChartDelete={mockChartDelete}
        style={{ width: '40vw', height: '40vh' }}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render chart title and labels correctly', () => {
    expect(screen.getByText(mockChartTitle)).toBeInTheDocument();
    expect(screen.getByTestId('chart')).toBeInTheDocument();

    mockLabels.forEach((label) => {
      expect(screen.getByText(label.name)).toBeInTheDocument();
    });
  });

  test('should call onChartModeChange when edit button is clicked', () => {
    fireEvent.click(screen.getByAltText('edit-chart-icon'));
    expect(mockChartModeChange).toHaveBeenCalledTimes(1);
  });

  test('should call onChartDelete when delete chart option is clicked', () => {
    const optionBtn = screen.getByRole('button', { name: 'option-icon' });
    fireEvent.click(optionBtn);

    const deleteBtn = screen.getByAltText('delete-icon');
    fireEvent.click(deleteBtn);

    expect(mockChartDelete).toHaveBeenCalledTimes(1);
  });

  test('should rename on clicking rename option after option is clicked', () => {
    const optionBtn = screen.getByRole('button', { name: 'option-icon' });
    fireEvent.click(optionBtn);

    const renameBtn = screen.getByAltText('rename-icon');
    fireEvent.click(renameBtn);

    const chartNameInputElement = screen.getByPlaceholderText(mockChartTitle);
    const updatedChartName = 'Updated Chart Title';
    fireEvent.change(chartNameInputElement, {
      target: { value: updatedChartName },
    });

    expect(chartNameInputElement).toHaveValue(updatedChartName);
  });
});
