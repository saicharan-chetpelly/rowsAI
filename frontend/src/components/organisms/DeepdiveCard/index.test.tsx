import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeepdiveIcon from '@public/assets/icons/deepdive.svg';
import DeepdiveCard from '.';

describe('Deepdive Card', () => {
  const mockDeepdiveMenuItemClick = jest.fn();
  test('should render label correctly', () => {
    render(
      <DeepdiveCard
        startIconSrc={DeepdiveIcon}
        startIconAlt="Deepdive Icon"
        label="Total Units Sold by Country"
        deepdiveId="1"
        onDeepdiveMenuItemClick={mockDeepdiveMenuItemClick}
      />,
    );
    const label = screen.getByText('Total Units Sold by Country');
    expect(label).toBeInTheDocument();
  });
  test('should open menu when clcked on deepdivecard', () => {
    render(
      <DeepdiveCard
        startIconSrc={DeepdiveIcon}
        startIconAlt="Deepdive Icon"
        label="Total Units Sold by Country"
        deepdiveId="1"
        onDeepdiveMenuItemClick={mockDeepdiveMenuItemClick}
      />,
    );
    const label = screen.getByText('Total Units Sold by Country');
    fireEvent.click(label);
  });
  test('should close menu when any one of menuitems is clicked', () => {
    render(
      <DeepdiveCard
        startIconSrc={DeepdiveIcon}
        startIconAlt="Deepdive Icon"
        label="Total Units Sold by Country"
        deepdiveId="1"
        onDeepdiveMenuItemClick={mockDeepdiveMenuItemClick}
      />,
    );
    const label = screen.getByText('Total Units Sold by Country');
    fireEvent.click(label);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.click(screen.getByAltText('Insert table'));
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
