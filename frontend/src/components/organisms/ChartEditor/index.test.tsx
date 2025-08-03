import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  CHART_EDITOR,
  CHART_SELECT_MENU_OPTIONS_DATA,
  MAIN_AXIS_MENU_OPTIONS_DATA,
  RADIO_LABELS,
} from 'utils/constants';
import { ThemeProvider } from '@mui/material';
import theme from 'theme';
import ChartEditor from '.';
import DefaultChartEditorOptions from './defaultChartEditorOptions';

const mockTogleChartEditor = jest.fn();
describe('Chart editor component', () => {
  it('should render chart editor', () => {
    render(
      <ThemeProvider theme={theme}>
        <ChartEditor open toggleChartEditor={mockTogleChartEditor} />
      </ThemeProvider>,
    );
    const chartEditor = screen.getByText(CHART_EDITOR);
    expect(chartEditor).toBeInTheDocument();
  });
  it('should close drawer when chart editor is closed', () => {
    render(
      <ThemeProvider theme={theme}>
        <ChartEditor open toggleChartEditor={mockTogleChartEditor} />
      </ThemeProvider>,
    );
    const closeIcon = screen.getByAltText('drawer-close-icon');
    fireEvent.click(closeIcon);
  });
  it('should call handleChange when other tab is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <ChartEditor open toggleChartEditor={mockTogleChartEditor} />
      </ThemeProvider>,
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);
  });
});
describe('DefaultChartEditor component', () => {
  test('should calls the onChange function when an chart option is selected', () => {
    const { getByText, getAllByRole } = render(<DefaultChartEditorOptions />);
    const selectElement = getAllByRole('combobox');
    fireEvent.mouseDown(selectElement[0]);
    const optionElement = getByText(CHART_SELECT_MENU_OPTIONS_DATA[1].label);
    fireEvent.click(optionElement);
  });
  test('should calls the onChange function when an main axis option is selected', () => {
    const { getAllByText, getAllByRole } = render(
      <DefaultChartEditorOptions />,
    );
    const selectElement = getAllByRole('combobox');
    fireEvent.mouseDown(selectElement[1]);
    const optionElement = getAllByText(MAIN_AXIS_MENU_OPTIONS_DATA[2].label);
    fireEvent.click(optionElement[0]);
  });
  it('should call handleChnage fn when clicked on radios', () => {
    render(<DefaultChartEditorOptions />);
    const rowsRadioInput = screen.getByLabelText(RADIO_LABELS[1]);
    fireEvent.click(rowsRadioInput);
    const columnRadioInput = screen.getByLabelText(RADIO_LABELS[0]);
    fireEvent.click(columnRadioInput);
  });
});
