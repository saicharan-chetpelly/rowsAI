import { Avatar, styled } from '@mui/material';
import theme from '../../../theme';

const StyledAvatar = styled(Avatar)({
  color: theme.palette.primaryCustom.PRIMARY_DARK,
  backgroundColor: theme.palette.structural[100],
  fontWeight: 700,
  '&.MuiAvatar-rounded': {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  fontSize: '1.6rem',
});

export default StyledAvatar;
