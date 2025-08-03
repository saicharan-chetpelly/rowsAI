import React from 'react';
import theme from 'theme';
import { Meta, StoryFn } from '@storybook/react';
import search from '../../../../public/assets/icons/search.svg';
import IconTypography from '.';

export default {
  title: 'molecules/IconTypography',
  component: IconTypography,
} as Meta<typeof IconTypography>;

const Template: StoryFn<typeof IconTypography> = ({ ...args }) => (
  <IconTypography {...args} />
);

export const Default = Template.bind({});
Default.args = {
  textText: 'OpenAI',
  textVariant: 'body2',
  textColor: theme.palette.textCustom.TEXT_HIGH_EMPHASIS,
  iconSrc: search,
  iconAltText: 'home',
};
