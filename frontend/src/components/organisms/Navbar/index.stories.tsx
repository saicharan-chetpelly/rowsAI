import type { Meta, StoryObj } from '@storybook/react';

import Navbar from './index';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'Organisms/Navbar',
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    variant: 'default',
    activePage: 'home',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'page',
    activePage: 'page1',
  },
};
