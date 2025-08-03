import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.';

const mockOnRowLogoClick = jest.fn();

describe('Header Component', () => {
  it('renders correctly', () => {
    const { getByAltText } = render(
      <Header onRowLogoClick={mockOnRowLogoClick} />,
    );

    expect(getByAltText('row-logo-icon')).toBeInTheDocument();
    expect(getByAltText('trend-icon')).toBeInTheDocument();
    expect(getByAltText('keyboard-shortcut-icon')).toBeInTheDocument();
  });

  it('calls onRowLogoClick when RowLogo is clicked', () => {
    const { getByAltText } = render(
      <Header onRowLogoClick={mockOnRowLogoClick} />,
    );

    fireEvent.click(getByAltText('row-logo-icon'));

    expect(mockOnRowLogoClick).toHaveBeenCalled();
  });
});
