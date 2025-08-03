import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Drawer from '.';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
import { DRAWER_SAMPLE_CONTENT } from '../../../utils/constants';

export default {
  title: 'Molecules/Drawer',
  component: Drawer,
} as Meta;

const Template: StoryFn<typeof Drawer> = (args) => <Drawer {...args} />;

export const Default = Template.bind({});

Default.args = {
  open: true,
  children: (
    <Typography
      variant="body2"
      color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
      {DRAWER_SAMPLE_CONTENT}
    </Typography>
  ),
  position: 'right',
  onClose: action('Drawer closed...'),
};
