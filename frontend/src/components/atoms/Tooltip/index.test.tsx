import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconButton } from '@mui/material';
import Tooltip from './index';
import Icon from '../Icon';

describe('Tooltip', () => {
  test('should render component', async () => {
    render(
      <Tooltip placement="top" title="AI analyst">
        <IconButton>
          <Icon src="assets/icons/filter-options.svg" alt="filter-options" />
        </IconButton>
      </Tooltip>,
    );
    fireEvent.mouseOver(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
