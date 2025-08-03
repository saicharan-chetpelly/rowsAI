import React, { useCallback, useMemo, useState } from 'react';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import theme from 'theme';
import MenuIcon from '@public/assets/icons/menu.svg';
import { CLICKED, DEEPDIVE_MENU, DEEPDIVE_TESTID } from 'utils/constants';
import { Box } from '@mui/material';
import Menu from '../../molecules/Menu';
import { Container, IconWrapper, StyledIconTypography } from './styled';

interface IDeepdiveCardProps {
  startIconSrc: string;
  startIconAlt: string;
  label: string;
  deepdiveId: string;
  query: string;
  deepdiveName: string;
  onDeepdiveMenuItemClick: (
    query: string,
    deepdiveName: string,
    menuItemId: string,
  ) => void;
}
interface IState {
  anchorEl: HTMLElement | null;
  clicked: string;
}
const DeepdiveCard = ({
  startIconSrc,
  startIconAlt,
  label,
  deepdiveId,
  query,
  deepdiveName,
  onDeepdiveMenuItemClick,
}: IDeepdiveCardProps) => {
  const [deepdiveState, setDeepdiveState] = useState<IState>({
    anchorEl: null,
    clicked: '',
  });
  const { anchorEl, clicked } = deepdiveState;
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setDeepdiveState((prevState) => ({
      ...prevState,
      anchorEl: event.currentTarget,
      clicked: CLICKED,
    }));
  };

  const handleClose = useCallback(() => {
    setDeepdiveState((prevState) => ({
      ...prevState,
      anchorEl: null,
      clicked: '',
    }));
  }, []);

  const DeepdiveMenu = useMemo(() => {
    const handleMenuItemClick = (menuItemId: string) => {
      onDeepdiveMenuItemClick(query, deepdiveName, menuItemId);
    };

    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        menuWidth="10%"
        menuData={DEEPDIVE_MENU}
        handleMenuItemClick={handleMenuItemClick}
      />
    );
  }, [anchorEl, open, handleClose, onDeepdiveMenuItemClick, deepdiveId]);

  return (
    <>
      <Container
        onClick={handleClick}
        clicked={clicked}
        data-testid={`${DEEPDIVE_TESTID}-${deepdiveId}`}
        key={deepdiveId}>
        <StyledIconTypography>
          <IconWrapper>
            <Icon src={startIconSrc} alt={startIconAlt} />
          </IconWrapper>
          <Typography
            variant="body2"
            color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
            {label}
          </Typography>
        </StyledIconTypography>
        <Box className="menu-icon-wrapper">
          <Icon src={MenuIcon} alt={startIconAlt} />
        </Box>
      </Container>
      {DeepdiveMenu}
    </>
  );
};

export default DeepdiveCard;
