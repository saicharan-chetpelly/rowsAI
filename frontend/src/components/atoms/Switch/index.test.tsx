import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from 'theme';
import { SwitchProps } from '@mui/material';
import Switch from '.';

const props: SwitchProps = {
  onChange: jest.fn(),
};

const renderComponent = () =>
  render(
    <ThemeProvider theme={theme}>
      <Switch {...props} />
    </ThemeProvider>,
  );
describe('Switch component tests', () => {
  it('should render correctly without any errors', () => {
    const { container } = renderComponent();
    const switchComponent = container.querySelector('.MuiSwitch-input');
    expect(switchComponent).toBeDefined();
  });
  it('should call onChange props when clicked', () => {
    const { container } = renderComponent();
    const switchComponent = container.querySelector('.MuiSwitch-input');

    fireEvent.click(switchComponent as Element);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
