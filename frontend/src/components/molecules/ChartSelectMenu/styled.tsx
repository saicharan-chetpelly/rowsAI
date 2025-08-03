import styled from '@emotion/styled';
import { Box, FormControl, Select, menuClasses } from '@mui/material';
import theme from 'theme';

export const StyledSelect = styled(Select)({
  width: '20vw',
  backgroundColor: theme.palette.structural[200],
  padding: '0.3rem 1.1rem',
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: '0.4rem',
  [`.${menuClasses.paper}`]: {
    boxShadow: 'none',
  },
});

export const StyledFormfield = styled(FormControl)({
  '& .MuiInput-underline::after': {
    borderBottom: `1px solid ${theme.palette.stroke[100]}`,
  },
  '& .MuiInput-underline::before': {
    '&.hover,&:focus': {
      borderBottom: 'none',
    },
    borderBottom: 'none',
  },
});

export const StyledMenuItemContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledIconTypography = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.8rem',
});
