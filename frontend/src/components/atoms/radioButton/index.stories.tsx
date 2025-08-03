import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, Typography } from '@mui/material';
import RadioButtons from '.';
import theme from '../../../theme';

export default {
  title: 'atoms/RadioButtons',
  component: RadioButtons,
  tags: ['autodocs'],
} as Meta<typeof RadioButtons>;

export const RadioStory: StoryObj<typeof RadioButtons> = {
  args: {
    label: (
      <ThemeProvider theme={theme}>
        <Typography variant="body1">Columns</Typography>
      </ThemeProvider>
    ),
    checked: false,
    onChange: action('Clicked on radio button'),
  },
};
