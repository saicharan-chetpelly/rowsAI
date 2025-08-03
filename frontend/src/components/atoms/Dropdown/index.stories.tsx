import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Insert from '../../../../public/assets/icons/insert.svg';
import TextStyles from '../../../../public/assets/icons/textStyles.svg';

import Dropdown from '.';
import Typography from '../Typography';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'atoms/Dropdown',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    label: <Typography variant="h6">Untitled 2</Typography>,
    isOpen: false,
    handleClick: action('Clicked!'),
  },
};

export const WithIconTypography: Story = {
  args: {
    startIconSrc: Insert,
    startIconAlt: 'Insert',
    label: 'Insert',
    isOpen: false,
    handleClick: action('Clicked!'),
  },
};

export const WithIcon: Story = {
  args: {
    startIconSrc: TextStyles,
    startIconAlt: 'Start Icon',
    isOpen: true,
    handleClick: action('Clicked!'),
  },
};
