import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioButtons from '.';

describe('RadioButtons component', () => {
  test('should render radio button correctly', () => {
    const handleChange = jest.fn();
    render(
      <RadioButtons
        value="columns"
        label="Columns"
        checked
        onChange={handleChange}
      />,
    );
  });

  test('should call onChange handler when clicked', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <RadioButtons
        value="rows"
        label="Rows"
        checked={false}
        onChange={handleChange}
      />,
    );

    const radioInput = getByLabelText('Rows');
    fireEvent.click(radioInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
