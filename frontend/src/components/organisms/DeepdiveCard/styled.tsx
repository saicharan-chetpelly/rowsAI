import { Box, styled } from '@mui/material';
import { CLICKED } from '../../../utils/constants';
import theme from '../../../theme';

export const Container = styled(Box)(({ clicked }: { clicked: string }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor:
    clicked === CLICKED
      ? theme.palette.structural[200]
      : theme.palette.structural.WHITE,
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: `${theme.spacing(2)}`,
  padding: `${theme.spacing(4)}`,
  '.menu-icon-wrapper': {
    display: clicked === CLICKED ? 'block' : 'none',
    width: `${theme.spacing(4)}`,
    height: `${theme.spacing(4)}`,
  },
  '&:hover': {
    backgroundColor: `${theme.palette.structural[200]}`,
    cursor: 'pointer',
    '.menu-icon-wrapper': {
      display: 'block',
    },
  },
}));

export const StyledIconTypography = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: `${theme.spacing(2)}`,
});

export const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${theme.palette.structural[100]}`,
  width: `${theme.spacing(6)}`,
  height: `${theme.spacing(6)}`,
});
