import { Box, Stack, styled } from '@mui/material';
import MuiIcon from '../../atoms/Icon';
import theme from '../../../theme/index';

export const StyledContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '0.8rem 1.6rem',
  minHeight: '3.6rem',
  '&:hover': {
    backgroundColor: `${theme.palette.greyCustom[100]}`,
  },
  justifyContent: 'space-between',
  cursor: 'pointer',
});

export const StyledInnerStack = styled(Stack)({
  alignItems: 'center',
  gap: '1.2rem',
});

export const StyledIcon = styled(MuiIcon)({
  height: '1.6rem',
  width: '1.6rem',
});
