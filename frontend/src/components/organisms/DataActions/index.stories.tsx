import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DataActions from '.';

export default {
  title: 'Organisms/DataActions',
  component: DataActions,
} as Meta;

const Template: StoryFn<typeof DataActions> = (args) => (
  <DataActions {...args} />
);

export const Default = Template.bind({});

Default.args = {
  open: true,
};
