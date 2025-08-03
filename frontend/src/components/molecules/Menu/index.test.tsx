import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DEEPDIVE_MENU } from 'utils/constants';
import Menu from '.';

describe('Menu', () => {
  it('should render the menu', () => {
    const mockHandleClose = jest.fn();
    const mockHandleMenuItemClick = jest.fn();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        handleClose={mockHandleClose}
        menuData={DEEPDIVE_MENU}
        menuWidth="100%"
        handleMenuItemClick={mockHandleMenuItemClick}
      />,
    );
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });
  it('should close the menu when click on any of menu item', () => {
    const mockHandleClose = jest.fn();
    const mockHandleMenuItemClick = jest.fn();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        handleClose={mockHandleClose}
        menuData={DEEPDIVE_MENU}
        menuWidth="100%"
        handleMenuItemClick={mockHandleMenuItemClick}
      />,
    );
    const insertTableMenuItem = screen.getByAltText('Insert table');
    fireEvent.click(insertTableMenuItem);
    expect(mockHandleClose).toHaveBeenCalled();
    expect(mockHandleMenuItemClick).toHaveBeenCalled();
  });
});
