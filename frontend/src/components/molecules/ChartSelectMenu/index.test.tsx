import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChartSelectMenu from '.';

const menuOptionsData = [
  { value: 'Line', label: 'Line Chart', icon: 'Line' },
  { value: 'Column', label: 'Column', icon: 'Column' },
];

test('should calls the onChange function when an option is selected', () => {
  const { getByText, getByRole } = render(
    <ChartSelectMenu MenuOptionsData={menuOptionsData} />,
  );
  const selectElement = getByRole('combobox');
  fireEvent.mouseDown(selectElement);
  const optionElement = getByText(menuOptionsData[1].label);
  fireEvent.click(optionElement);
});
const defaultValue = 'default';
test('should render the default value when there is no option', () => {
  render(
    <ChartSelectMenu
      MenuOptionsData={menuOptionsData}
      defaultValue={defaultValue}
    />,
  );
});
