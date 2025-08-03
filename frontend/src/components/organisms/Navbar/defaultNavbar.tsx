import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import theme from 'theme';
import {
  AVATAR_DEFAULT_LABEL,
  DEFAULT_NAV_DATA,
  DEFAULT_USER_NAME,
  DEFAULT_NAV_FOOTER_DATA,
  UP_ARROW_DOWN_ARROW_ALT_TEXT,
  DEFAULT_NAVBAR_TESTID,
} from 'utils/constants';
import NavItem from 'components/molecules/NavItem';
import Icon from 'components/atoms/Icon';
import { NavItemType } from 'utils/types';
import UpDownArrowIcon from '@public/assets/icons/upDownArrow.svg';
import Avatar from 'components/atoms/Avatar';
import Typography from 'components/atoms/Typography';
import {
  Container,
  StyledIconTypographyWrapper,
  StyledNavItemsContainer,
  StyledUserProfileContainer,
} from './styles';

interface DefaultNavbarProps {
  activePageTitle: string;
  navData?: NavItemType[];
  footerNavData?: NavItemType[];
}

const renderNavItems = (
  data: NavItemType[],
  active: string,
  handleSetActivePage: (currentPageTitle: string) => void,
) =>
  data.map((navItem: NavItemType) => {
    const isActive = active === navItem.text.toLowerCase();
    const handleNavItemClick = useCallback(() => {
      if (!isActive) handleSetActivePage(navItem.text.toLowerCase());
    }, [isActive, navItem.text]);

    return navItem.isDivider ? (
      <Divider key={`divider-${navItem.navItemId}`} />
    ) : (
      <StyledNavItemsContainer key={`navItem-${navItem.navItemId}`}>
        <NavItem
          key={navItem.navItemId}
          iconSrc={navItem.iconSrc}
          iconAlt={navItem.iconAlt}
          text={navItem.text}
          variant={navItem.variant}
          textColor={navItem.textColor}
          className={isActive ? 'active' : ''}
          handleClick={handleNavItemClick}
        />
      </StyledNavItemsContainer>
    );
  });

const DefaultNavbar = ({
  activePageTitle,
  navData = DEFAULT_NAV_DATA,
  footerNavData = DEFAULT_NAV_FOOTER_DATA,
}: DefaultNavbarProps) => {
  const [active, setActive] = useState<string>('');
  const handleSetActivePage = (currentPageTitle: string) => {
    setActive(() => currentPageTitle);
  };

  useEffect(() => {
    setActive(activePageTitle);
  }, [activePageTitle]);
  return (
    <Container data-testid={DEFAULT_NAVBAR_TESTID}>
      <Box>
        <StyledUserProfileContainer>
          <Avatar variant="rounded">{AVATAR_DEFAULT_LABEL}</Avatar>
          <StyledIconTypographyWrapper>
            <Typography
              variant="body2"
              color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}
              fontSize="1.8rem"
              fontWeight={700}>
              {DEFAULT_USER_NAME}
            </Typography>
            <Icon alt={UP_ARROW_DOWN_ARROW_ALT_TEXT} src={UpDownArrowIcon} />
          </StyledIconTypographyWrapper>
        </StyledUserProfileContainer>
        {renderNavItems(navData, active, handleSetActivePage)}
      </Box>
      <Box>{renderNavItems(footerNavData, active, handleSetActivePage)}</Box>
    </Container>
  );
};
DefaultNavbar.defaultProps = {
  navData: DEFAULT_NAV_DATA,
  footerNavData: DEFAULT_NAV_FOOTER_DATA,
};
export default React.memo(DefaultNavbar);
