import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DEEPDIVE_MENU,
  DEEPDIVE_TESTID,
  DEEP_DIVES,
  MENU_ITEM_TESTID,
} from 'utils/constants';
import Deepdives from '.';

describe('Deepdives Component', () => {
  it('should handle handler on clicking menuitem of deepdive card', () => {
    render(<Deepdives data={DEEP_DIVES} />);
    const deepdiveTestid = `${DEEPDIVE_TESTID}-${DEEP_DIVES[0].deepdiveId}`;
    const deepdive = screen.getByTestId(deepdiveTestid);
    fireEvent.click(deepdive);
    const menuItemTestid = `${MENU_ITEM_TESTID}-${DEEPDIVE_MENU[0].menuItemID}`;
    const menuItem = screen.getByTestId(menuItemTestid);
    expect(screen.getByTestId(menuItemTestid)).toBeInTheDocument();
    fireEvent.click(menuItem);
  });
});
