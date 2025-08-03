import { Stack, styled } from '@mui/material';
import Icon from 'components/atoms/Icon';
import theme from 'theme';

export const ChartHeaderStack = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
});

export const LabelStack = styled(Stack)({
  alignItems: 'center',
  marginRight: '1rem',
  marginBottom: '1rem',
});

export const Circle = styled('div')<{
  backgroundColor: string;
}>(({ backgroundColor }) => ({
  width: '0.8rem',
  height: '0.8rem',
  backgroundColor,
  borderRadius: '50%',
}));

export const EditIcon = styled(Icon)({
  width: theme.spacing(4),
  height: theme.spacing(4),
});
