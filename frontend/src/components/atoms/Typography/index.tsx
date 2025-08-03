import React from 'react';
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import { TypographyVarient } from 'utils/types';

interface TypographyProps extends MuiTypographyProps {
  variant: TypographyVarient;
  children: React.ReactNode;
}

const Typography = ({ children, variant, ...props }: TypographyProps) => (
  <MuiTypography {...props} variant={variant}>
    {children}
  </MuiTypography>
);

export default Typography;
