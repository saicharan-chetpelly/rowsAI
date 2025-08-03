import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import theme from 'theme';
import { DIVIDER_TESTID } from 'utils/constants';
import MenuItem from '.';

describe('MenuItem component', () => {
  const defaultProps = {
    menuItemID: '1',
    iconSrc: 'icon.svg',
    iconAlt: 'icon alt text',
    children: 'Menu Item',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  };

  it('should calls handleClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MenuItem {...defaultProps} handleClick={handleClick} />);
    fireEvent.click(screen.getByText('Menu Item'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should renders end icon based on isToggle prop', () => {
    render(
      <ThemeProvider theme={theme}>
        <MenuItem {...defaultProps} isToggle />
      </ThemeProvider>,
    );
  });

  it('should renders with default end icon alt text when endIconAlt is not provided', () => {
    render(
      <MenuItem
        {...defaultProps}
        endIconSrc="endIcon.svg"
        endIconAlt="icon"
        isDisabled
      />,
    );
    expect(screen.getByAltText('icon')).toBeInTheDocument();
  });
  it('should render divider componet if isDivider is true', () => {
    render(
      <MenuItem
        {...defaultProps}
        endIconSrc="endIcon.svg"
        endIconAlt="icon"
        isDisabled
        isDivider
      />,
    );
    expect(screen.getByTestId(DIVIDER_TESTID)).toBeInTheDocument();
  });
});
