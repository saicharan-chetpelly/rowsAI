import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  ALT_TEXT,
  MENU_DELETE_TEXT,
  MENU_FUNCTION_TEXT,
  MENU_VIEW_TEXT,
} from 'utils/constants';
import Typography from 'components/atoms/Typography';
import MenuItem, { MenuItemProps } from '.';
import Delete from '../../../../public/assets/icons/delete.svg';
import Eye from '../../../../public/assets/icons/eyeIcon.svg';
import RightArrow from '../../../../public/assets/icons/rightArrow.svg';
import Function from '../../../../public/assets/icons/function.svg';
import theme from '../../../theme';

export default {
  title: 'molecules/MenuItem',
  component: MenuItem,
  argTypes: {
    text: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<MenuItemProps> = (args) => <MenuItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconSrc: Delete,
  iconAlt: ALT_TEXT,
  children: (
    <Typography variant="body2" color={theme.palette.red[200]}>
      {MENU_DELETE_TEXT}
    </Typography>
  ),
  isToggle: false,
  isDivider: false,
};

export const WithSwitch = Template.bind({});
WithSwitch.args = {
  iconSrc: Eye,
  iconAlt: ALT_TEXT,
  children: (
    <Typography
      variant="body2"
      color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
      {MENU_VIEW_TEXT}
    </Typography>
  ),
  isToggle: true,
  isDivider: false,
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  iconSrc: Function,
  iconAlt: ALT_TEXT,
  children: (
    <Typography
      variant="body2"
      color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
      {MENU_FUNCTION_TEXT}
    </Typography>
  ),
  isToggle: false,
  endIconSrc: RightArrow,
  endIconAlt: ALT_TEXT,
  isDisabled: true,
  isDivider: false,
};
