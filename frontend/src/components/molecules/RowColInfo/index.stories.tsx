import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import RowColInfo, { RowColInfoProps } from '.';

export default {
  title: 'molecules/RowColInfo',
  component: RowColInfo,
} as Meta;

const Template: StoryFn<RowColInfoProps> = (args) => <RowColInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  rowColInfoText: 'B2',
  rowColInfoData: 'Summer sale',
};
