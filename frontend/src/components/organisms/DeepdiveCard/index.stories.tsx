import type { Meta, StoryObj } from '@storybook/react';

import DeepdiveIcon from '@public/assets/icons/deepdive.svg';
import DeepdiveCard from './index';

const meta: Meta<typeof DeepdiveCard> = {
  component: DeepdiveCard,
  title: 'Organisms/DeepdiveCard',
};

export default meta;
type Story = StoryObj<typeof DeepdiveCard>;

export const Primary: Story = {
  args: {
    startIconSrc: DeepdiveIcon,
    startIconAlt: 'Deepdive Icon',
    label: 'Total Units Sold by Country',
    deepdiveId: '1',
  },
};
