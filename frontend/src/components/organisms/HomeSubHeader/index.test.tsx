import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeSubHeader from '.';

describe('HomeSubHeader component', () => {
  it('should calls the handleClick function when create button is clicked', () => {
    const mockHandleClick = jest.fn();
    const { getByTestId } = render(
      <HomeSubHeader handleClick={mockHandleClick} />,
    );
    fireEvent.click(getByTestId('create-button-testid'));
    expect(mockHandleClick).toHaveBeenCalled();
  });
});
