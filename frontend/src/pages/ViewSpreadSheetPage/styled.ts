import { Stack, styled } from '@mui/material';
import Button from 'components/atoms/Button';
import theme from 'theme';

export const ItemCenterStack = styled(Stack)({
  alignItems: 'center',
  gap: '0.4rem',
});

export const EditButton = styled(Button)({
  padding: '6.4px 24px',
  textAlign: 'center',
  backgroundColor: `${theme.palette.yellow[100]}`,
  '&:hover': {
    backgroundColor: `${theme.palette.yellow[100]}`,
  },
});

export const SheetOptionStack = styled(Stack)({
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  padding: '0.8rem 0.8rem 0rem 0.8rem',
});
