import { Box, Stack, styled } from '@mui/material';

export const ContentStack = styled(Stack)({
  margin: '1% 10% 0% 10%',
});

export const RecentActivityStack = styled(Stack)({
  marginTop: '2.5rem',
  marginBottom: '1rem',
});

export const StyledScrollableWrapper = styled(Box)({
  overflow: 'auto',
  height: '70vh',
});
