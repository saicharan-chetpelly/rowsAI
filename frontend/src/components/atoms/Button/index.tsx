import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface MuiButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: MuiButtonProps) => (
  <MuiButton
    disableRipple
    disableElevation
    disableFocusRipple
    disableTouchRipple
    {...props}>
    {children}
  </MuiButton>
);

export default Button;
