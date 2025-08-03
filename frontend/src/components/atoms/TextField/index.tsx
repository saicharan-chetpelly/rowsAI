import React from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import theme from 'theme';
import StyledTextField from './index.styles';

const body2Styles = {
  fontSize: '1.4rem',
  fontWeight: 'normal',
  lineHeight: '1.428',
  letterSpacing: '0.2px',
};

export type TextFieldProps = MuiTextFieldProps & {
  height?: string | number;
  scheme?: 'dark' | 'light';
  placeholderTextColor?: string;
};

const TextField = (props: TextFieldProps) => (
  <StyledTextField
    inputProps={{
      style: {
        ...body2Styles,
        color: props.placeholderTextColor,
      },
    }}
    {...props}
  />
);

TextField.defaultProps = {
  height: '40px',
  scheme: 'light',
  placeholderTextColor: theme.palette.textCustom.TEXT_HIGH_EMPHASIS,
};

export default TextField;
