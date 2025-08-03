import React, { ReactNode } from 'react';
import {
  Drawer as MuiDrawer,
  IconButton,
  Stack,
  Box,
  styled,
} from '@mui/material';
import theme from 'theme';
import Icon from '../../atoms/Icon';
import closeIcon from '../../../../public/assets/icons/close.svg';

type DrawerPosition = 'top' | 'left' | 'bottom' | 'right';

interface DrawerProps {
  open: boolean;
  position: DrawerPosition;
  children: ReactNode;
  onClose: () => void;
}

const CloseButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '1rem',
  marginBottom: '1.5rem',
  marginRight: '1rem',
});

const StyledDrawer = styled(MuiDrawer)({
  '& .MuiPaper-root': {
    top: theme.spacing(13.5),
  },
});

const Drawer = ({ position, open, onClose, children }: DrawerProps) => (
  <StyledDrawer
    anchor={position}
    open={open}
    onClose={onClose}
    variant="persistent">
    <Stack>
      <CloseButtonBox>
        <IconButton onClick={onClose}>
          <Icon src={closeIcon} alt="drawer-close-icon" />
        </IconButton>
      </CloseButtonBox>
      <Box>{children}</Box>
    </Stack>
  </StyledDrawer>
);

export default Drawer;
