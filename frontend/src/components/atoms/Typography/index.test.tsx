import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Typography from '.';

describe('Typography', () => {
  test('should be true', () => {
    render(<Typography variant="h2">Hi</Typography>);
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });
});
