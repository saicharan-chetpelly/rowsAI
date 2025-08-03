import React from 'react';
import { Box } from '@mui/material';
import Tooltip from 'components/atoms/Tooltip';
import { MORE_ICON_ALT_TEXT, OPTIONS_TOOLTIP_LABEL } from 'utils/constants';
import Icon from 'components/atoms/Icon';
import MoreIcon from '@public/assets/icons/menu.svg';
import { StyledIconButton } from './styles';

const MoreMenuIcon = () => (
  <Box className="more-icon">
    <Tooltip title={OPTIONS_TOOLTIP_LABEL} placement="top">
      <StyledIconButton>
        <Icon src={MoreIcon} alt={MORE_ICON_ALT_TEXT} />
      </StyledIconButton>
    </Tooltip>
  </Box>
);

export default MoreMenuIcon;
