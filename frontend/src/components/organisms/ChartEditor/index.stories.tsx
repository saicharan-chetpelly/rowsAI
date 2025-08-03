import type { Meta, StoryObj } from '@storybook/react';
import ChartEditor from './index';

const meta: Meta<typeof ChartEditor> = {
  component: ChartEditor,
  title: 'Organisms/Chart Editor',
};

export default meta;
type Story = StoryObj<typeof ChartEditor>;

export const Primary: Story = {
  args: {
    open: true,
  },
};
