import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import Header from 'components/molecules/Header';
import Navbar from 'components/organisms/Navbar';
import SpreadsheetTemplate from 'templates/SpreadsheetTemplate';
import {
  ALT_TEXT,
  DUPLICATE_TEXT,
  EDIT_TEXT,
  HIDE_SIDEBAR_ICON_ALT_TEXT,
  SHARE_TEXT,
  SIDEBAR_TOGGLE_TOOLTIP_TEXT,
} from 'utils/constants';
import Typography from 'components/atoms/Typography';
import theme from 'theme';
import HideSidebarIcon from '@public/assets/icons/hideSidebar.svg';
import Share from '@public/assets/icons/share.svg';
import Duplicate from '@public/assets/icons/duplicate.svg';

import Icon from 'components/atoms/Icon';
import { StyledButton } from 'components/organisms/Spreadsheet/styled';
import Tooltip from 'components/atoms/Tooltip';
import { useNavigate } from 'react-router-dom';
import MainBody from 'pages/EditSpreadsheetPage/mainBody';
import { EditButton, ItemCenterStack, SheetOptionStack } from './styled';
import { useSpreadsheetContext } from 'utils/ThemeContext';
import useNavigation from 'pages/EditSpreadsheetPage/navHook';
import { updatePageAndDataTableContext } from 'utils/function';

const ViewSpreadSheetPage = () => {
  const navigate = useNavigate();
  const [showSideNav, setShowSideNav] = useState<boolean>(true);
  const {
    spreadsheetState,
    setActivePageId,
    setActivePageTitle,
    setPageAndDataTablesData,
    clearPageAndDataTableData,
  } = useSpreadsheetContext();
  const { pageAndDataTablesData, activePageTitle, currActiveSpreadsheetId } =
    spreadsheetState;
  const { fetchPagesAndDataTables } = useNavigation();
  const handleBackNavigation = () => {
    navigate('/');
  };
  const handleEditButton = useCallback(() => {
    navigate(`/edit/${currActiveSpreadsheetId}`);
  }, [navigate]);

  const handleToggleSidebar = useCallback(() => {
    setShowSideNav((prevState) => !prevState);
  }, []);
  useEffect(() => {
    const updatePagesAndDataTables = async () => {
      clearPageAndDataTableData();
      const response = await fetchPagesAndDataTables(
        currActiveSpreadsheetId,
        setActivePageId,
        setActivePageTitle,
        null,
      );
      updatePageAndDataTableContext(response, setPageAndDataTablesData);
    };
    updatePagesAndDataTables();
  }, [currActiveSpreadsheetId]);
  return (
    <SpreadsheetTemplate
      header={<Header onRowLogoClick={handleBackNavigation} />}
      sideNav={
        <Box sx={{ display: showSideNav ? 'initial' : 'none' }}>
          <Navbar
            activePage={activePageTitle || 'Page 1'}
            variant="page"
            pageNavItemData={pageAndDataTablesData}
            setDataState={() => {}}
          />
        </Box>
      }
      bodyContent={
        <Stack spacing="3rem">
          <Stack>
            <Stack
              direction="row"
              marginLeft="1rem"
              marginRight="1rem"
              justifyContent="space-between">
              <Tooltip title={SIDEBAR_TOGGLE_TOOLTIP_TEXT} placement="bottom">
                <StyledButton onClick={handleToggleSidebar}>
                  <Icon
                    src={HideSidebarIcon}
                    alt={HIDE_SIDEBAR_ICON_ALT_TEXT}
                    height={theme.spacing(4)}
                    width={theme.spacing(4)}
                  />
                </StyledButton>
              </Tooltip>
              <SheetOptionStack direction="row" spacing="2rem">
                <ItemCenterStack direction="row">
                  <Icon
                    src={Share}
                    alt={ALT_TEXT}
                    height={theme.spacing(4)}
                    width={theme.spacing(4)}
                  />
                  <Typography
                    variant="body2"
                    color={theme.palette.greyCustom[300]}>
                    {SHARE_TEXT}
                  </Typography>
                </ItemCenterStack>
                <ItemCenterStack direction="row">
                  <Icon src={Duplicate} alt={ALT_TEXT} />
                  <Typography
                    variant="body2"
                    color={theme.palette.greyCustom[300]}>
                    {DUPLICATE_TEXT}
                  </Typography>
                </ItemCenterStack>
                <EditButton onClick={handleEditButton}>
                  <Typography
                    variant="body2"
                    color={theme.palette.greyCustom[300]}>
                    {EDIT_TEXT}
                  </Typography>
                </EditButton>
              </SheetOptionStack>
            </Stack>
            <Divider />
          </Stack>
          <MainBody toggleAIAnalyst={() => {}} />
        </Stack>
      }
    />
  );
};

export default ViewSpreadSheetPage;
