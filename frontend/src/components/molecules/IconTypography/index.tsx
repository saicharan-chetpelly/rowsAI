import React from 'react';
import { ICON_TYPO_DATA_TEST_ID } from 'utils/constants';
import Typography from 'components/atoms/Typography';
import { TypographyVarient } from 'utils/types';
import theme from 'theme';
import { Box, BoxProps, styled } from '@mui/material';
import Icon from 'components/atoms/Icon';

interface IconTypoProps {
  textVariant: TypographyVarient;
  textText: string;
  textColor?: string;
  iconSrc: string;
  iconAltText: string;
  gap?: BoxProps['gap'];
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  cursor: 'pointer',
});

const IconTypography = ({
  textVariant,
  textText,
  textColor,
  iconSrc,
  iconAltText,
  gap,
}: IconTypoProps) => (
  <StyledBox data-testid={ICON_TYPO_DATA_TEST_ID} gap={gap}>
    <Icon src={iconSrc} alt={iconAltText} />
    <Typography variant={textVariant} color={textColor}>
      {textText}
    </Typography>
  </StyledBox>
);

IconTypography.defaultProps = {
  textColor: theme.palette.textCustom.TEXT_HIGH_EMPHASIS,
  gap: '0.8rem',
};

export default IconTypography;
