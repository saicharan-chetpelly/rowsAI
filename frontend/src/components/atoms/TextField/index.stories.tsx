import { Meta, StoryFn } from '@storybook/react';
import { Grid, InputAdornment, Stack } from '@mui/material';
import React from 'react';
import searchIcon from '../../../../public/assets/icons/search.svg';
import TextField, { TextFieldProps } from '.';
import theme from '../../../theme';

export default {
  title: 'Atoms/TextField',
  component: TextField,
} as Meta;

const Template: StoryFn<TextFieldProps> = (args) => (
  <Grid container>
    <Grid item xs={5}>
      <TextField {...args} fullWidth />
    </Grid>
  </Grid>
);

const DarkTemplate: StoryFn<TextFieldProps> = (args) => (
  <Grid container p={3} bgcolor="#3A032D">
    <Grid item xs={5}>
      <TextField {...args} fullWidth />
    </Grid>
  </Grid>
);
export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  height: '40px',
  placeholder: 'Search for action or integration..',
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <Stack
          alignItems="center"
          justifyContent="center"
          marginRight={theme.spacing(3)}>
          <img src={searchIcon} alt="search" />
        </Stack>
      </InputAdornment>
    ),
  },
};

export const StandardVariant = Template.bind({});
StandardVariant.args = {
  variant: 'standard',
  height: '32px',
  scheme: 'light',
};

export const Dark = DarkTemplate.bind({});
Dark.args = {
  variant: 'outlined',
  height: '32px',
  scheme: 'dark',
};
