import type { Meta, StoryObj } from '@storybook/react';

import { DEEP_DIVES } from 'utils/constants';
import Deepdives from './index';

const meta: Meta<typeof Deepdives> = {
  component: Deepdives,
  title: 'Organisms/Deepdives',
};

export default meta;
type Story = StoryObj<typeof Deepdives>;

export const Primary: Story = {
  args: {
    data: DEEP_DIVES,
  },
};
