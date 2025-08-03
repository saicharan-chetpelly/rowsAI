import { Menu, menuClasses, styled } from '@mui/material';
import theme from '../../../theme/index';

const StyledMenu = styled(Menu)(({ width }: { width: string }) => ({
  [`.${menuClasses.paper}`]: {
    width,
    boxShadow: `0px 2px 1px -1px ${theme.palette.shadow[100]}, 0px 1px 1px 0px ${theme.palette.shadow[200]}, 0px 1px 3px 0px ${theme.palette.shadow[300]}`,
  },
}));

export default StyledMenu;
