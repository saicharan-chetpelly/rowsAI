import { Box, Grid, Stack, styled } from '@mui/material';
import Button from 'components/atoms/Button';
import theme from 'theme';

export const DataActionGrid = styled(Grid)({
  width: '43.5rem',
  padding: '2.5rem',
});

export const ImportFileStack = styled(Stack)({
  marginTop: '1.5rem',
});

export const ImportFileButton = styled(Button)({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '1.5rem',
  border: `1px solid ${theme.palette.greyCustom[400]}`,
  ':hover': {
    background: 'transparent',
    border: `1px solid ${theme.palette.greyCustom[400]}`,
  },
});

export const ImportHeaderStack = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const PlatformButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  minWidth: '30rem',
  marginTop: '1.5rem',
});

export const PlatformOptionButton = styled(Box)({
  display: 'flex',
  gap: '1rem',
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '0.5rem',
  width: '16.5rem',
  height: theme.spacing(10),
  padding: '0.5rem',
  justifyContent: 'flex-start',
  alignItems: 'center',
});
