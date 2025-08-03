import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SpreadsheetSubHeader from '.';

describe('SpreadsheetSubHeader component', () => {
  it('should renders with props', () => {
    render(
      <SpreadsheetSubHeader
        handleSidebar={() => {}}
        handleViewButton={() => {}}
        handleDataActions={() => {}}
        handleMenuItemClick={() => {}}
      />,
    );
  });

  it('should calls handleDataActions when data actions button is clicked', () => {
    const handleDataActionsMock = jest.fn();
    const { getByText } = render(
      <SpreadsheetSubHeader
        handleSidebar={() => {}}
        handleViewButton={() => {}}
        handleDataActions={handleDataActionsMock}
        handleMenuItemClick={() => {}}
      />,
    );

    fireEvent.click(getByText('Data Actions'));
    expect(handleDataActionsMock).toHaveBeenCalledTimes(1);
  });

  it('should calls handleViewButton when view button is clicked', () => {
    const handleViewButtonMock = jest.fn();
    const { getByText } = render(
      <SpreadsheetSubHeader
        handleSidebar={() => {}}
        handleViewButton={handleViewButtonMock}
        handleDataActions={() => {}}
        handleMenuItemClick={() => {}}
      />,
    );

    fireEvent.click(getByText('View'));
    expect(handleViewButtonMock).toHaveBeenCalledTimes(1);
  });

  it('should opens the dropdown menu when insert button is clicked', () => {
    const { getByText } = render(
      <SpreadsheetSubHeader
        handleSidebar={() => {}}
        handleViewButton={() => {}}
        handleDataActions={() => {}}
        handleMenuItemClick={() => {}}
      />,
    );
    fireEvent.click(getByText('Insert'));
    const tableMenuItem = screen.getByTestId('menuitem-testid-1');
    fireEvent.click(tableMenuItem);
  });
});
