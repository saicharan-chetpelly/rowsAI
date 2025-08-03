import { Box, Stack, styled } from '@mui/material';
import Button from '../../atoms/Button';
import theme from '../../../theme';

export const ContainerStack = styled(Stack)({
  padding: '1.5rem',
});

export const AnalystDataStack = styled(Stack)({
  padding: '1rem',
  position: 'relative',
  minHeight: '85vh',
  justifyContent: 'space-between',
});

export const NoDataBox = styled(Box)({
  height: '80vh',
  padding: '1rem',
});

export const ImportDataButton = styled(Button)({
  backgroundColor: theme.palette.yellow[100],
  padding: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.yellow[100],
    opacity: '0.8',
  },
});

export const AnalystHeaderStack = styled(Stack)({
  padding: '1rem',
});

export const FeedbackBox = styled(Box)({
  position: 'absolute',
  bottom: 0,
});

export const DataHelperStack = styled(Stack)({
  display: 'flex',
  width: '100%',
  height: '95%',
  justifyContent: 'center',
  justifyItems: 'center',
  alignContent: 'center',
  alignItems: 'center',
});

export const LoaderStack = styled(Stack)({
  width: '34.5rem',
  height: '75vh',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '2rem',
});
