import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '.';

describe('Icon component testcases', () => {
  test('should have src prop', () => {
    render(
      <Image
        src="public/assets/icons/import-file.svg"
        alt="Import File Icon"
      />,
    );
    const image = screen.getByAltText('Import File Icon');
    expect(image.getAttribute('src')).toBeDefined();
  });
});
