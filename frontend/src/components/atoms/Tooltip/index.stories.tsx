import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@mui/material';
import Tooltip from './index';
import Icon from '../Icon';
import FilterOptionsIcon from '../../../../public/assets/icons/filter-options.svg';

const placementOptions = [
  'bottom-end',
  'bottom-start',
  'bottom',
  'left-end',
  'left-start',
  'left',
  'right-end',
  'right-start',
  'right',
  'top-end',
  'top-start',
  'top',
];
const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Atoms/Tooltip',
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: placementOptions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    title: 'Filter options',
    placement: 'bottom',
    children: (
      <IconButton>
        <Icon src={FilterOptionsIcon} alt="filter-options" />
      </IconButton>
    ),
  },
};
