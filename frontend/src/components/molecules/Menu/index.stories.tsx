import type { Meta, StoryObj } from '@storybook/react';

import { DEEPDIVE_MENU } from 'utils/constants';
import Menu from './index';

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'molecules/Menu',
  argTypes: {
    handleClose: {
      action: 'Option clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const DeepdiveMenu: Story = {
  args: {
    anchorEl: document.createElement('div'),
    open: true,
    menuData: DEEPDIVE_MENU,
    menuWidth: '250px',
  },
};
