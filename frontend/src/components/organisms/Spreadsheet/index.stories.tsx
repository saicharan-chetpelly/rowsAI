import type { Meta, StoryObj } from '@storybook/react';

import { SPREADSHEET_DUMMY_DATA } from 'utils/constants';
import Spreadhsheet from '.';

const meta: Meta<typeof Spreadhsheet> = {
  component: Spreadhsheet,
  title: 'Organisms/Spreadsheet',
};

export default meta;
type Story = StoryObj<typeof Spreadhsheet>;

export const Primary: Story = {
  args: {
    data: SPREADSHEET_DUMMY_DATA,
    spreadhsheetTitle: 'Table 1',
  },
};
