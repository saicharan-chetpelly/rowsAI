import { SwitchProps } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Switch from '.';

export default {
  title: 'Atoms/Switch',
  component: Switch,
} as Meta;

const Template: StoryFn<SwitchProps> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
