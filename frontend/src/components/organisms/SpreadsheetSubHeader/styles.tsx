import { Box, styled } from '@mui/material';
import theme from 'theme';
import MuiButton from 'components/atoms/Button';

export const MainContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.stroke[100]}`,
  padding: '0rem 1.6rem 0rem 1.6rem',
  background: theme.palette.structural.WHITE,
  justifyContent: 'space-between',
  paddingBottom: '0.8rem',
});

export const MenuContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.structural.WHITE,
  justifyContent: 'space-between',
  gap: '1.5rem',
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.structural.WHITE,
  gap: '0.8rem',
});

export const StyledIconTypoButton = styled(MuiButton)({
  padding: `0.64rem 0.8rem`,
  backgroundColor: `${theme.palette.structural.WHITE}`,
  '&:hover': {
    backgroundColor: `${theme.palette.structural.WHITE}`,
  },
});

export const StyledTextButton = styled(MuiButton)({
  padding: '0.64rem 2.4rem',
  backgroundColor: `${theme.palette.yellow[100]}`,
  '&:hover': {
    backgroundColor: `${theme.palette.yellow[100]}`,
  },
});

export const StyledArrowsBox = styled(Box)({
  display: 'flex',
  gap: '2.5rem',
});

export const TableStylesBox = styled(Box)({
  display: 'flex',
  gap: '1rem',
});

export const StyledTooltipButton = styled(MuiButton)({
  minWidth: '4.6rem',
  padding: '0',
  backgroundColor: `${theme.palette.structural.WHITE}`,
  '&:hover': {
    backgroundColor: `${theme.palette.structural[50]}`,
  },
});
