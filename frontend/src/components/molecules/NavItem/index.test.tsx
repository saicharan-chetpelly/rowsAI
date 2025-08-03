import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { HOME_ALT_TEXT, HOME_TEXT } from 'utils/constants';
import NavItem from '.';

describe('NavItem component', () => {
  it('should renders with correct props', () => {
    const iconSrc = 'public/assets/icons/home.svg';
    const iconAlt = HOME_ALT_TEXT;
    const text = HOME_TEXT;
    const variant = 'body1';
    const textColor = '#1A1A1A';
    render(
      <NavItem
        iconSrc={iconSrc}
        iconAlt={iconAlt}
        text={text}
        variant={variant}
        textColor={textColor}
      />,
    );
    const home = screen.getByText(text);
    fireEvent.click(home);
  });
});
