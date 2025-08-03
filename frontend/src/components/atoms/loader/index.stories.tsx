import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Loader from '.';

export default {
  title: 'atoms/Loader',
  component: Loader,
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
} as Meta;

const Template: StoryFn = (args) => <Loader progress={40} {...args} />;

export const Default = Template.bind({});
