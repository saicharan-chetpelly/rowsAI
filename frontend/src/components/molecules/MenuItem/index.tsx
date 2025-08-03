import React from 'react';
import { ALT_TEXT, DIVIDER_TESTID, MENU_ITEM_TESTID } from 'utils/constants';
import Switch from 'components/atoms/Switch';
import { Divider } from '@mui/material';
import { StyledIcon, StyledInnerStack, StyledContainer } from './styled';

export interface MenuItemProps {
  menuItemID: string;
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
  endIconSrc?: string;
  endIconAlt?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  isToggle: boolean;
  isDisabled: boolean;
  isDivider: boolean;
}

const MenuItem = ({
  menuItemID,
  iconSrc,
  iconAlt,
  children,
  endIconSrc,
  endIconAlt,
  handleClick,
  isToggle,
  isDisabled,
  isDivider,
}: MenuItemProps) => {
  const containerStyle = isDisabled
    ? { cursor: 'not-allowed', pointerEvents: 'none' }
    : {};
  if (isDivider) {
    return <Divider data-testid={DIVIDER_TESTID} />;
  }
  return (
    <StyledContainer
      onClick={handleClick}
      sx={containerStyle}
      key={menuItemID}
      data-testid={`${MENU_ITEM_TESTID}-${menuItemID}`}>
      <StyledInnerStack direction="row">
        <StyledIcon src={iconSrc} alt={iconAlt} />
        {children}
      </StyledInnerStack>
      {isToggle ? (
        <Switch />
      ) : (
        endIconSrc && (
          <StyledIcon src={endIconSrc} alt={endIconAlt ?? ALT_TEXT} />
        )
      )}
    </StyledContainer>
  );
};

MenuItem.defaultProps = {
  endIconSrc: '',
  endIconAlt: '',
  handleClick: () => {},
};

export default MenuItem;
