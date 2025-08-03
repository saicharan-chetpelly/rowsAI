import type { Meta, StoryObj } from '@storybook/react';
import ImportFileIcon from '../../../../public/assets/icons/import-file.svg';

import Icon from './index';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    src: ImportFileIcon,
    alt: 'Import File Icon',
  },
};
