import { Box, Button, styled } from '@mui/material';
import theme from '../../../theme';

export const HeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 1.5rem 0.5rem 0rem',
  justifyItems: 'center',
  alignContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primaryCustom.PRIMARY_DARK,
});

export const SignupButton = styled(Button)({
  minWidth: '3rem',
  backgroundColor: theme.palette.structural[100],
  '&:hover': { backgroundColor: theme.palette.grey[100] },
});
