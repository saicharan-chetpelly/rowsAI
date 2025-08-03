import { Box, styled } from '@mui/material';
import MuiButton from 'components/atoms/Button';
import theme from 'theme';

export const StyledHeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledButtonsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2.4rem',
  gap: '1.6rem',
});

export const StyledButton = styled(MuiButton)({
  padding: '1.6rem',
  width: `${theme.spacing(94.5)}`,
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: `${theme.spacing(2)}`,
  '&:hover': {
    backgroundColor: `${theme.palette.greyCustom[100]}`,
  },
});

export const StyledMockButton = styled(MuiButton)({
  padding: '1.6rem',
  width: `${theme.spacing(94.5)}`,
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: `${theme.spacing(2)}`,
  '&:hover': {
    cursor: 'default',
    backgroundColor: `${theme.palette.structural.WHITE}`,
  },
});
