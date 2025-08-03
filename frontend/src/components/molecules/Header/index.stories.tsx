import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Header from '.';

export default {
  title: 'Molecules/Header',
  component: Header,
} as Meta;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
