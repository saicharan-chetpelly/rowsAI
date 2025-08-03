import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import MenuItem, { MenuItemProps } from '../MenuItem';
import StyledMenu from './styles';

interface MenuProps {
  menuWidth: string;
  menuData: MenuItemProps[];
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  handleMenuItemClick: (id: string) => void;
}

const Menu = ({
  menuData,
  anchorEl,
  open,
  handleClose,
  menuWidth,
  handleMenuItemClick,
}: MenuProps) => (
  <StyledMenu
    width={menuWidth}
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}>
    {menuData.map((deepdiveMenuItem) => (
      <MenuItem
        key={uuidv4()}
        handleClick={() => {
          handleClose();
          handleMenuItemClick(deepdiveMenuItem.menuItemID);
        }}
        iconSrc={deepdiveMenuItem.iconSrc}
        iconAlt={deepdiveMenuItem.iconAlt}
        endIconSrc={deepdiveMenuItem.endIconSrc}
        endIconAlt={deepdiveMenuItem.endIconAlt}
        isToggle={deepdiveMenuItem.isToggle}
        isDisabled={deepdiveMenuItem.isDisabled}
        isDivider={deepdiveMenuItem.isDivider}
        menuItemID={deepdiveMenuItem.menuItemID}>
        {deepdiveMenuItem.children}
      </MenuItem>
    ))}
  </StyledMenu>
);

export default Menu;
