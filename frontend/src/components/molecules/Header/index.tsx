import React from 'react';
import { Button, Stack } from '@mui/material';
import {
  APP_HEADER_OPTION,
  APP_AUTH_OPTION,
  SIGNUP_OPTION,
  SEARCH_PLACEHOLDER_TEXT,
  BACK_TO_DASHBOARD,
} from 'utils/constants';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import TextField from 'components/atoms/TextField';
import theme from 'theme';
import RowLogo from '@public/assets/icons/row-logo.svg';
import trendIcon from '@public/assets/icons/trend.svg';
import GiftAndQAIcon from '@public/assets/icons/gift-and-QA.svg';
import keyboardShortcutIcon from '@public/assets/icons/keyboard.svg';
import Tooltip from 'components/atoms/Tooltip';
import { HeaderBox, SignupButton } from './index.styles';

export interface HeaderProps {
  onRowLogoClick: () => void;
}

const Header = ({ onRowLogoClick }: HeaderProps) => (
  <HeaderBox>
    <Stack direction="row" spacing="1rem">
      <Tooltip placement="bottom" title={BACK_TO_DASHBOARD}>
        <Button>
          <Icon src={RowLogo} alt="row-logo-icon" onClick={onRowLogoClick} />
        </Button>
      </Tooltip>
      <TextField
        placeholder={SEARCH_PLACEHOLDER_TEXT}
        placeholderTextColor={theme.palette.structural.WHITE}
        InputProps={{
          startAdornment: <Icon src={trendIcon} alt="trend-icon" />,
          endAdornment: (
            <Icon src={keyboardShortcutIcon} alt="keyboard-shortcut-icon" />
          ),
        }}
      />
    </Stack>
    <Stack direction="row" spacing="1.3rem">
      {APP_HEADER_OPTION.map((option) => (
        <Button key={option}>
          <Typography variant="body2" color={theme.palette.structural.WHITE}>
            {option}
          </Typography>
        </Button>
      ))}
      <Icon src={GiftAndQAIcon} alt="gift-and-qa-icon" />
      {APP_AUTH_OPTION.map((authOption) =>
        authOption === SIGNUP_OPTION ? (
          <SignupButton key={authOption} variant="contained">
            <Typography
              variant="body2"
              color={theme.palette.primaryCustom.PRIMARY_DARK}>
              {authOption}
            </Typography>
          </SignupButton>
        ) : (
          <Button key={authOption}>
            <Typography variant="body2" color={theme.palette.structural.WHITE}>
              {authOption}
            </Typography>
          </Button>
        ),
      )}
    </Stack>
  </HeaderBox>
);

export default Header;
