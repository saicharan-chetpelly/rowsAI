import React from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../src/theme';
import '../src/App.css';
import { SpreadsheetProvider } from '../src/utils/ThemeContext';

const withThemeProvider: Decorator = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <SpreadsheetProvider>
        <CssBaseline />
        <Story {...context} />
      </SpreadsheetProvider>
    </ThemeProvider>
  );
};
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withThemeProvider],
};

export default preview;
