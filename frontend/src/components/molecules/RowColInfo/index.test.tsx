import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RowColInfo from '.';

describe('RowColInfo component', () => {
  const defaultProps = {
    rowColInfoText: 'B2',
    rowColInfoData: 'Summer sale',
  };
  it('should renders with correct data', () => {
    const { getByText } = render(<RowColInfo {...defaultProps} />);
    expect(getByText('B2')).toBeInTheDocument();
    expect(getByText('Summer sale')).toBeInTheDocument();
  });
});
