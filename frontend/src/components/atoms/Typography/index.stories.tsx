import type { Meta, StoryObj } from '@storybook/react';

import Typography from './index';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Atoms/Typography',
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    variant: 'h5',
    children: 'Home',
  },
};
