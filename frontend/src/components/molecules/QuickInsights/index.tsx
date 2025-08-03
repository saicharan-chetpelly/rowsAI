import React from 'react';
import { Box } from '@mui/material';
import { MENU_ALT_TEXT, QUICK_INSIGTHS_TEXT } from 'utils/constants';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import theme from '../../../theme';
import MenuIcon from '../../../../public/assets/icons/menu.svg';
import { InnerContainer, StyledBox } from './styled';

export interface QuickInsightsProps {
  quickInsightsData: Record<number, string>;
}

const QuickInsights = ({ quickInsightsData }: QuickInsightsProps) => (
  <Box>
    <Typography
      variant="subtitle1"
      color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
      {QUICK_INSIGTHS_TEXT}
    </Typography>
    <StyledBox>
      {Object.entries(quickInsightsData).map(([id, text]) => (
        <InnerContainer key={id}>
          <Typography
            variant="body2"
            color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
            {text}
          </Typography>
          <Box className="menu-icon">
            <Icon src={MenuIcon} alt={MENU_ALT_TEXT} />
          </Box>
        </InnerContainer>
      ))}
    </StyledBox>
  </Box>
);

export default QuickInsights;
