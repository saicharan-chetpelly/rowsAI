import React from 'react';
import { render, screen } from '@testing-library/react';
import Dropdown from '.';

describe('Dropdown component testcases', () => {
  test('should render dropdown with start icon and label', () => {
    const handleClick = jest.fn();
    render(
      <Dropdown
        startIconSrc="public/assets/icons/downArrow.svg"
        startIconAlt="icon"
        label="Dropdown Label"
        isOpen={false}
        handleClick={handleClick}
      />,
    );
  });

  test('should render upside down icon when isOpen is true', () => {
    render(<Dropdown label="Dropdown Label" isOpen handleClick={() => {}} />);
    screen.getByAltText('icon');
  });
});
