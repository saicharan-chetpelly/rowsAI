import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ChartSelectMenu, {
  ChartSelectMenuProps,
  MenuOptionsInterface,
} from './index';
import Line from '../../../../public/assets/icons/lineIcon.svg';
import Bar from '../../../../public/assets/icons/barIcon.svg';
import Pie from '../../../../public/assets/icons/pieIcon.svg';
import Column from '../../../../public/assets/icons/columnIcon.svg';
import Combo from '../../../../public/assets/icons/comboIcon.svg';
import Scatter from '../../../../public/assets/icons/scatterIcon.svg';

export default {
  title: 'molecules/ChartSelectMenu',
  component: ChartSelectMenu,
} as Meta;

const Template: StoryFn<ChartSelectMenuProps> = (args) => (
  <ChartSelectMenu {...args} />
);

const menuOptionsData: MenuOptionsInterface[] = [
  { value: 'Line', label: 'Line Chart', icon: Line },
  { value: 'Column', label: 'Column', icon: Column },
  { value: 'Combo', label: 'Combo', icon: Combo },
  { value: 'Bar', label: 'Bar Chart', icon: Bar },
  { value: 'Stacked Column', label: 'Stacked Column', icon: Column },
  { value: 'Stacked Bar', label: 'Stacked Bar', icon: Bar },
  { value: 'Scatter', label: 'Scatter', icon: Scatter },
  { value: 'Pie', label: 'Pie Chart', icon: Pie },
];

export const Default = Template.bind({});
Default.args = {
  MenuOptionsData: menuOptionsData,
};
