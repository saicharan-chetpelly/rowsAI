import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Tabs from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'molecules/Tabs',
  argTypes: {
    handleChange: { action: 'clicked' },
  },
};

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Setup', element: <div>Element One</div> },
      { label: 'More options', element: <div>Element Two</div> },
    ],
    value: 0,
  },
};

export default meta;
