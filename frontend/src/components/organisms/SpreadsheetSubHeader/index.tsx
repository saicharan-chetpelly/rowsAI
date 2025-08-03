import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Icon from 'components/atoms/Icon';
import {
  ALT_TEXT,
  DATA_ACTIONS_TEXT,
  DUPLICATE_TEXT,
  HIDE_ALT_TEXT,
  INSERT_MENU,
  INSERT_TEXT,
  MORE_FORMATS_ALT_TEXT,
  MORE_FORMATS_TEXT,
  SHARE_TEXT,
  TABLE_STYLES_DATA,
  TOOLBAR_ARROWS,
  VIEW_TEXT,
} from 'utils/constants';
import theme from 'theme';
import Typography from 'components/atoms/Typography';
import { VerticalDivider } from 'components/molecules/RowColInfo';
import Dropdown from 'components/atoms/Dropdown';
import Tooltip from 'components/atoms/Tooltip';
import Menu from 'components/molecules/Menu';
import {
  ButtonContainer,
  MainContainer,
  MenuContainer,
  StyledArrowsBox,
  StyledIconTypoButton,
  StyledTextButton,
  StyledTooltipButton,
  TableStylesBox,
} from './styles';
import Duplicate from '../../../../public/assets/icons/duplicate.svg';
import Share from '../../../../public/assets/icons/share.svg';
import HideSidebar from '../../../../public/assets/icons/hideSidebar.svg';
import Insert from '../../../../public/assets/icons/insert.svg';
import DataAction from '../../../../public/assets/icons/dataAction.svg';
import Eraser from '../../../../public/assets/icons/eraser.svg';
import MoreFormats from '../../../../public/assets/icons/moreFormats.svg';

interface SpreadsheetSubHeaderProps {
  handleSidebar: React.MouseEventHandler<HTMLDivElement>;
  handleViewButton: React.MouseEventHandler<HTMLButtonElement>;
  handleDataActions: React.MouseEventHandler<HTMLButtonElement>;
  handleMenuItemClick: (id: string) => void;
}

const ToolbarArrows = () => (
  <StyledArrowsBox>
    {TOOLBAR_ARROWS.map((icon) => (
      <Icon src={icon.iconSrc} alt={icon.iconAlt} key={icon.arrowId} />
    ))}
  </StyledArrowsBox>
);

const TableStyles = () => (
  <TableStylesBox>
    {TABLE_STYLES_DATA.map((icon) => (
      <Tooltip title={icon.title} placement="bottom" key={icon.styleId}>
        <StyledTooltipButton>
          <Dropdown
            startIconSrc={icon.startIconSrc}
            isOpen={false}
            startIconAlt={icon.startIconAlt}
          />
        </StyledTooltipButton>
      </Tooltip>
    ))}
  </TableStylesBox>
);

const SpreadsheetSubHeader = ({
  handleSidebar,
  handleViewButton,
  handleDataActions,
  handleMenuItemClick,
}: SpreadsheetSubHeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  return (
    <MainContainer>
      <MenuContainer>
        <Icon
          src={HideSidebar}
          alt={HIDE_ALT_TEXT}
          height={theme.spacing(4)}
          width={theme.spacing(4)}
          onClick={handleSidebar}
          style={{ cursor: 'pointer' }}
        />
        <VerticalDivider />
        <ToolbarArrows />
        <VerticalDivider />
        <Dropdown
          isOpen={open}
          startIconSrc={Insert}
          label={
            <Typography variant="body2" color={theme.palette.greyCustom[300]}>
              {INSERT_TEXT}
            </Typography>
          }
          handleClick={handleClick}
        />
        <StyledIconTypoButton onClick={handleDataActions}>
          <Stack direction="row" alignItems="center" gap="0.4rem">
            <Icon
              src={DataAction}
              alt={ALT_TEXT}
              height={theme.spacing(4)}
              width={theme.spacing(4)}
            />
            <Typography variant="body2" color={theme.palette.greyCustom[300]}>
              {DATA_ACTIONS_TEXT}
            </Typography>
          </Stack>
        </StyledIconTypoButton>
        <VerticalDivider />
        <TableStyles />
        <VerticalDivider />
        <Tooltip title={MORE_FORMATS_TEXT} placement="bottom">
          <StyledTooltipButton>
            <Dropdown
              startIconSrc={MoreFormats}
              isOpen={false}
              startIconAlt={MORE_FORMATS_ALT_TEXT}
            />
          </StyledTooltipButton>
        </Tooltip>
        <VerticalDivider />
        <Icon src={Eraser} alt={ALT_TEXT} />
      </MenuContainer>
      <ButtonContainer>
        <StyledIconTypoButton>
          <Stack direction="row" alignItems="center" gap="0.4rem">
            <Icon
              src={Duplicate}
              alt={ALT_TEXT}
              height={theme.spacing(4)}
              width={theme.spacing(4)}
            />
            <Typography variant="body2" color={theme.palette.greyCustom[300]}>
              {DUPLICATE_TEXT}
            </Typography>
          </Stack>
        </StyledIconTypoButton>
        <StyledIconTypoButton>
          <Stack direction="row" alignItems="center" gap="0.4rem">
            <Icon
              src={Share}
              alt={ALT_TEXT}
              height={theme.spacing(4)}
              width={theme.spacing(4)}
            />
            <Typography variant="body2" color={theme.palette.greyCustom[300]}>
              {SHARE_TEXT}
            </Typography>
          </Stack>
        </StyledIconTypoButton>
        <StyledTextButton onClick={handleViewButton}>
          <Typography variant="body2" color={theme.palette.greyCustom[300]}>
            {VIEW_TEXT}
          </Typography>
        </StyledTextButton>
      </ButtonContainer>
      {open && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          menuData={INSERT_MENU}
          menuWidth="21.5rem"
          handleClose={() => setOpen(false)}
          handleMenuItemClick={handleMenuItemClick}
        />
      )}
    </MainContainer>
  );
};

export default SpreadsheetSubHeader;
