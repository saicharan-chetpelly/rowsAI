import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Drawer from '.';

const position = 'right';
const open = true;
const onClose = jest.fn();
const childrenText = 'Drawer content';

describe('Drawer component', () => {
  test('should renders children when open correctly', () => {
    const { getByText } = render(
      <Drawer position={position} open={open} onClose={onClose}>
        {childrenText}
      </Drawer>,
    );

    expect(getByText(childrenText)).toBeInTheDocument();
  });
  test('should close the drawer on click on close button', () => {
    const { getByAltText } = render(
      <Drawer position={position} open={open} onClose={onClose}>
        {childrenText}
      </Drawer>,
    );

    const closeButton = getByAltText('drawer-close-icon');

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
