import { Stack, styled } from '@mui/material';
import theme from 'theme';

export const BodyContainer = styled(Stack)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const SpreadsheetSubHeaderContainer = styled(Stack)({
  paddingTop: theme.spacing(1.75),
});

export const RowColInfoContainer = styled(Stack)({
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.5),
  borderBottom: `1px solid ${theme.palette.stroke[100]}`,
});

export const StyledStack = styled(Stack)({
  height: '85vh',
  padding: `0 ${theme.spacing(6)} ${theme.spacing(6)} ${theme.spacing(6)}`,
  overflowY: 'auto',
});

export const TitleContainer = styled(Stack)({
  marginTop: theme.spacing(10),
});

export const MainContainer = styled(Stack)({
  marginTop: theme.spacing(12),
  gap: theme.spacing(7.5),
});
