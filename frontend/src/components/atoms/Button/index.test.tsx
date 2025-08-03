import React from 'react';
import { render } from '@testing-library/react';
import Button from '.';
import { IMPORT_TEXT } from '../../../utils/constants';

describe('Button Component', () => {
  test('should render button component properly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{IMPORT_TEXT}</Button>);
  });
});
