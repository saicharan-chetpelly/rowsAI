import { Box, styled } from '@mui/material';
import theme from 'theme';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: `${theme.spacing(2)}`,
});

export default Container;
