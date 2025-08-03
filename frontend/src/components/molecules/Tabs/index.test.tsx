import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from 'theme';
import * as Stories from './index.stories';

const { Default } = composeStories(Stories);

describe('Tabs', () => {
  test('renders correctly', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Default handleChange={onChange} />
      </ThemeProvider>,
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
