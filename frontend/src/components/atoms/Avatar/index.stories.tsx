import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Square: Story = {
  args: {
    variant: 'rounded',
    children: 'A',
  },
};
