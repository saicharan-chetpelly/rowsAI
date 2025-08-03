import { Box, styled } from '@mui/material';
import theme from 'theme';

export const StyledBox = styled(Box)({
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: '0.8rem',
  marginTop: '1rem',
  marginBottom: '1rem',
});

export const InnerContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  justifyContent: 'space-between',
  padding: '0.8rem 1.2rem',
  '& .menu-icon': {
    visibility: 'hidden',
  },
  '&:hover': {
    backgroundColor: `${theme.palette.structural[200]}`,
    cursor: 'pointer',
    '& .menu-icon': {
      visibility: 'visible',
    },
  },
});
