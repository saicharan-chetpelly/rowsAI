import React from 'react';
import { render } from '@testing-library/react';
import Loader from './index';

describe('Loader component', () => {
  it('should renders with correct progress value', () => {
    const progress = 50;
    render(<Loader progress={progress} />);
  });
});
