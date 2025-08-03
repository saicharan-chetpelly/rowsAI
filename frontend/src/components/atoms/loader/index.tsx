import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material';
import theme from '../../../theme';

export interface LoaderProps {
  progress: number;
}

const StyledLinearProgress = styled(LinearProgress)({
  borderRadius: '3.2rem',
  backgroundColor: theme.palette.structural[200],
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: theme.palette.purple[100],
  },
  height: `${theme.spacing(1.5)}`,
});

const Loader = ({ progress }: LoaderProps) => (
  <StyledLinearProgress variant="determinate" value={progress} />
);

export default Loader;
