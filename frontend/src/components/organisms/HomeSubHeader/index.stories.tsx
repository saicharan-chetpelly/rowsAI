import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HomeSubHeader from '.';

const meta: Meta<typeof HomeSubHeader> = {
  component: HomeSubHeader,
  title: 'organisms/HomeSubHeader',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HomeSubHeader>;

export const Primary: Story = {
  args: {
    handleClick: () => {
      action('Clicked!')();
    },
  },
};
