import { Switch as MuiSwitch, styled } from '@mui/material';
import theme from '../../../theme';

const StyledSwitch = styled(MuiSwitch)({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&.MuiSwitch-root.Mui-checked': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: theme.palette.structural.WHITE,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.green[100],
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: `0 2px 4px 0 ${theme.palette.shadow.boxShadow1}`,
    width: 11,
    height: 11,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
    '&.Mui-checked': {
      color: theme.palette.structural.WHITE,
    },
    color: theme.palette.grey[300],
  },
  '& .MuiSwitch-track': {
    border: `1px solid ${theme.palette.stroke[100]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.structural.WHITE,
    boxSizing: 'border-box',
  },
});

export default StyledSwitch;
