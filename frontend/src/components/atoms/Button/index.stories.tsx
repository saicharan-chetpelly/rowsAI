import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  ALT_TEXT,
  CREATE_SPREADSHEET_TEXT,
  IMPORT_TEXT,
} from 'utils/constants';
import theme from '../../../theme';
import Button from '.';
import Icon from '../Icon';
import AddSquare from '../../../../public/assets/icons/addSquare.svg';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'text'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ ...args }) => (
  <Button {...args} onClick={action('clicked')} />
);

export const IconTextButton = Template.bind({});
IconTextButton.args = {
  children: (
    <Stack direction="row" alignItems="center" gap="0.5rem">
      <Icon
        src={AddSquare}
        alt={ALT_TEXT}
        height={theme.spacing(4)}
        width={theme.spacing(4)}
      />
      <Typography
        variant="body2"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        {CREATE_SPREADSHEET_TEXT}
      </Typography>
    </Stack>
  ),
  sx: {
    padding: `${theme.spacing(4)}`,
    width: `${theme.spacing(81.25)}`,
    border: `1px solid ${theme.palette.stroke[100]}`,
    borderRadius: `${theme.spacing(2)}`,
    '&:hover': {
      backgroundColor: `${theme.palette.structural.WHITE}`,
    },
  },
};

export const TextButton = Template.bind({});
TextButton.args = {
  children: (
    <Typography
      variant="body2"
      color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
      {IMPORT_TEXT}
    </Typography>
  ),
  sx: {
    padding: `${theme.spacing(2.5)} ${theme.spacing(8)}`,
    backgroundColor: `${theme.palette.yellow[100]}`,
    borderRadius: `${theme.spacing(1)}`,
    '&:hover': {
      backgroundColor: `${theme.palette.yellow[100]}`,
    },
  },
};
