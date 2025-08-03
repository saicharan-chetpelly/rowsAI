import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from 'theme';
import TextField, { TextFieldProps } from '.';

const props: TextFieldProps = {
  onChange: jest.fn(),
  placeholder: 'test',
};

const renderComponent = (
  scheme: 'dark' | 'light',
  variant?: 'outlined' | 'standard',
) =>
  render(
    <ThemeProvider theme={theme}>
      <TextField scheme={scheme} variant={variant} {...props} />
    </ThemeProvider>,
  );

describe('TextField tests', () => {
  it('should render without errors', () => {
    const { getByPlaceholderText } = renderComponent('light', 'outlined');
    expect(getByPlaceholderText('test')).toBeDefined();
  });

  it('should call onChange when input value is changed', () => {
    const { getByPlaceholderText } = renderComponent('dark', 'outlined');
    const textField = getByPlaceholderText('test');
    expect(textField).toBeDefined();
    fireEvent.change(textField, { target: { value: 'test123' } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
