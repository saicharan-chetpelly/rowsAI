import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { HOME_ALT_TEXT, HOME_TEXT } from 'utils/constants';
import NavItem, { NavItemProps } from '.';
import Home from '../../../../public/assets/icons/home.svg';

export default {
  title: 'molecules/NavItem',
  component: NavItem,
  argTypes: {
    text: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<NavItemProps> = (args) => <NavItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconSrc: Home,
  iconAlt: HOME_ALT_TEXT,
  text: HOME_TEXT,
  variant: 'body1',
};
