import { Box, Stack, styled } from '@mui/material';
import theme from 'theme';

export const SpreadsheetBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: '1.5rem 0.8rem 1.5rem 1.5rem',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.greyCustom[100],
  },
  '& > *:nth-child(1)': {
    width: '37%',
  },
  '& > *:nth-child(2)': {
    width: '25%',
  },
  '& > *:nth-child(3)': {
    width: '25%',
  },
  '& > *:nth-child(4)': {
    width: '10%',
  },
});

export const OptionStack = styled(Stack)({
  justifyContent: 'flex-end',
  alignItems: 'center',
});
