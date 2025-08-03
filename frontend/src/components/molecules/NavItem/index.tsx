import React from 'react';
import { Box, styled, typographyClasses } from '@mui/material';
import { TypographyVarient } from 'utils/types';
import theme from 'theme';
import MuiTypography from '../../atoms/Typography';
import MuiIcon from '../../atoms/Icon';

export interface NavItemProps {
  iconSrc: string;
  iconAlt: string;
  text: string;
  variant: TypographyVarient;
  textColor: string;
  handleClick?: () => void;
  className?: string;
}

const StyledContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0 1.6rem',
  minHeight: '3.6rem',
  borderRadius: '0.4rem',
  color: `${theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}`,
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.greyCustom[100],
    [`& .${typographyClasses.root}`]: {
      color: `${theme.palette.textCustom.TEXT_HIGH_EMPHASIS}`,
    },
  },
  backgroundColor: 'inherit',
});

const StyledIcon = styled(MuiIcon)({
  height: '1.6rem',
  width: '1.6rem',
});

const NavItem = ({
  iconSrc,
  iconAlt,
  text,
  variant,
  textColor,
  handleClick,
  className,
}: NavItemProps) => (
  <StyledContainer
    onClick={handleClick}
    className={className}
    data-testid={`navItem-${text}`}>
    <StyledIcon src={iconSrc} alt={iconAlt} />
    <MuiTypography variant={variant} color={textColor}>
      {text}
    </MuiTypography>
  </StyledContainer>
);

NavItem.defaultProps = {
  handleClick: () => {},
  className: 'nav-item',
};

export default NavItem;
