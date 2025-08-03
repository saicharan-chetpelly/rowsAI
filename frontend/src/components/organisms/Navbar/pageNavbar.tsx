import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import IconTypography from 'components/molecules/IconTypography';
import Typography from 'components/atoms/Typography';
import Tooltip from 'components/atoms/Tooltip';
import Icon from 'components/atoms/Icon';
import theme from 'theme';

import InsertIcon from '@public/assets/icons/insert.svg';
import DownArrowIcon from '@public/assets/icons/downArrow.svg';
import SideArrowIcon from '@public/assets/icons/sideArrow.svg';
import {
  ADD_PAGE,
  ADD_PAGE_ELEMENT_TOOLTIP_LABEL,
  DEFAULT_USERNAME_AND_SPREADSHEETS_TEXT,
  DOWN_ARROW_ICON_ALT_TEXT,
  INSERT_ICON_ALT_TEXT,
  PAGE_NAVBAR_TESTID,
  PAGE_NAV_ITEM_DATA,
  SIDE_ARROW_ICON_ALT_TEXT,
  SPREADSHEET_TITLE_PLACEHOLDER,
  SPREADSHEET_USER_PROFILE,
} from 'utils/constants';
import TextField from 'components/atoms/TextField';
import { PageDataTableType } from 'utils/types';
import useSpreadsheet from 'pages/HomePage/hooks';
import {
  Container,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledBox,
  StyledIconButton,
  StyledNavItemIconWrapper,
  StyledPageNavItem,
  StyledPageNavItemWrapper,
  StyledPageSection,
  StyledSpreadhseetUserProfile,
  StyledSpreadsheetNameWrapper,
} from './styles';
import MoreMenuIcon from './MoreMenuIcon';
import { useSpreadsheetContext } from 'utils/ThemeContext';
import { scrollToSpecificDataTable } from 'utils/function';
import { Matrix } from 'react-spreadsheet';

interface PageNavbarProps {
  activePage: string;
  pageNavItemData?: PageDataTableType[];
  setDataState: React.Dispatch<
    React.SetStateAction<
      Matrix<{
        value: string;
      }>
    >
  >;
}
interface PageNavbarState {
  isTextFieldVisible: boolean;
  spreadsheetTitle: string;
  active: string;
  activeSection: string;
  expanded: string | false;
}

const PageNavbar = ({
  activePage,
  pageNavItemData,
  setDataState,
}: PageNavbarProps) => {
  const { getCurrentSpreadsheetTitle, updateSpreadsheetTitle } =
    useSpreadsheet();
  const {
    setActivePageId,
    setActivePageTitle,
    spreadsheetState,
    setCurrActiveSpreadsheetTitle,
  } = useSpreadsheetContext();
  const defaultActiveSection =
    pageNavItemData && pageNavItemData.length > 0
      ? pageNavItemData[0]?.dataTableData[0]?.title
      : '';

  const [pageNavbarState, setPageNavbarState] = useState<PageNavbarState>({
    isTextFieldVisible: false,
    spreadsheetTitle: 'Untitled',
    active: activePage,
    activeSection: defaultActiveSection,
    expanded: activePage,
  });

  useEffect(() => {
    const fetchSpreadsheetTitle = async () => {
      try {
        const title = await getCurrentSpreadsheetTitle(
          spreadsheetState.currActiveSpreadsheetId,
        );
        setCurrActiveSpreadsheetTitle(title);
        setPageNavbarState((prevState) => ({
          ...prevState,
          spreadsheetTitle: title,
        }));
      } catch (error) {
        console.error('Error fetching spreadsheet title:', error);
      }
    };

    fetchSpreadsheetTitle();
  }, [spreadsheetState.currActiveSpreadsheetId]);

  const handleAccordionPanelChange = useCallback(
    (
      panel: string,
      navItemLabel: string,
      navItemId: number,
      currActiveSection: string,
    ) =>
      (event: React.SyntheticEvent, newExpanded: boolean) => {
        setPageNavbarState((prevState: PageNavbarState) => ({
          ...prevState,
          expanded: newExpanded ? panel : false,
          active: navItemLabel,
          activeSection: currActiveSection,
        }));

        if (spreadsheetState.activePageTitle !== navItemLabel) {
          setActivePageId(navItemId);
          setActivePageTitle(navItemLabel);
        }
      },
    [spreadsheetState.activePageTitle, setActivePageId, setActivePageTitle],
  );

  const handleActiveSection = (
    sectionTitle: string,
    dataTableId: string,
    data: Matrix<{
      value: string;
    }>,
  ) => {
    setPageNavbarState((prevState) => ({
      ...prevState,
      activeSection: sectionTitle,
    }));
    setDataState(data);
    scrollToSpecificDataTable(dataTableId);
  };

  const handleSpreadsheetTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setPageNavbarState((prevState) => ({
      ...prevState,
      spreadsheetTitle: value,
    }));
  };

  const handleTextFieldVisibility = useCallback(() => {
    setPageNavbarState((prevState) => ({
      ...prevState,
      isTextFieldVisible: true,
    }));
  }, []);

  const handleTextFieldBlur = async () => {
    try {
      await updateSpreadsheetTitle(
        spreadsheetState.currActiveSpreadsheetId,
        pageNavbarState.spreadsheetTitle,
      );
    } catch (error) {
      console.error('Error updating spreadsheet title:', error);
    }
    setPageNavbarState((prevState) => ({
      ...prevState,
      isTextFieldVisible: false,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleTextFieldBlur();
    }
  };
  return (
    <Container data-testid={PAGE_NAVBAR_TESTID}>
      <Box>
        <StyledSpreadhseetUserProfile>
          <Typography
            variant="body2"
            fontSize="1.2rem"
            color={theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}>
            {DEFAULT_USERNAME_AND_SPREADSHEETS_TEXT}
          </Typography>
          {!pageNavbarState.isTextFieldVisible ? (
            <StyledSpreadsheetNameWrapper
              onDoubleClick={handleTextFieldVisibility}
              data-testid={SPREADSHEET_USER_PROFILE}>
              <Typography
                variant="h6"
                fontWeight={700}
                color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
                {pageNavbarState.spreadsheetTitle}
              </Typography>
              <Icon src={DownArrowIcon} alt={DOWN_ARROW_ICON_ALT_TEXT} />
            </StyledSpreadsheetNameWrapper>
          ) : (
            <TextField
              variant="standard"
              scheme="light"
              height={theme.spacing(8)}
              value={pageNavbarState.spreadsheetTitle}
              name="spreadsheet-title"
              onChange={handleSpreadsheetTitleChange}
              onKeyDown={handleKeyDown}
              placeholder={SPREADSHEET_TITLE_PLACEHOLDER}
            />
          )}
        </StyledSpreadhseetUserProfile>
        <StyledPageNavItemWrapper>
          {pageNavItemData?.map((navItem) => (
            <StyledAccordion
              expanded={pageNavbarState.expanded === navItem.text}
              disableGutters
              elevation={0}
              key={navItem.navItemId}
              onChange={handleAccordionPanelChange(
                navItem.text,
                navItem.text,
                parseInt(navItem.navItemId, 10),
                navItem.dataTableData[0]?.title,
              )}>
              <StyledAccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={
                  <Icon src={SideArrowIcon} alt={SIDE_ARROW_ICON_ALT_TEXT} />
                }>
                <StyledBox>
                  <Typography variant="body1">{navItem.text}</Typography>
                  <StyledNavItemIconWrapper>
                    <Box className="insert-icon">
                      <Tooltip
                        title={ADD_PAGE_ELEMENT_TOOLTIP_LABEL}
                        placement="top">
                        <StyledIconButton>
                          <Icon src={InsertIcon} alt={INSERT_ICON_ALT_TEXT} />
                        </StyledIconButton>
                      </Tooltip>
                    </Box>
                    <MoreMenuIcon />
                  </StyledNavItemIconWrapper>
                </StyledBox>
              </StyledAccordionSummary>
              <StyledAccordionDetails>
                {navItem.dataTableData?.map((item) => (
                  <StyledPageNavItem
                    key={item.id}
                    className={
                      pageNavbarState.activeSection === item.title
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      handleActiveSection(item.title, item.id, item.data)
                    }>
                    <StyledPageSection>
                      <Typography variant="body1">{item.title}</Typography>
                      <MoreMenuIcon />
                    </StyledPageSection>
                  </StyledPageNavItem>
                ))}
              </StyledAccordionDetails>
            </StyledAccordion>
          ))}
          <StyledPageNavItem>
            <IconTypography
              iconSrc={InsertIcon}
              textVariant="body1"
              textText={ADD_PAGE}
              iconAltText={INSERT_ICON_ALT_TEXT}
              gap={theme.spacing(2)}
            />
          </StyledPageNavItem>
        </StyledPageNavItemWrapper>
      </Box>
    </Container>
  );
};

PageNavbar.defaultProps = {
  pageNavItemData: PAGE_NAV_ITEM_DATA,
};

export default React.memo(PageNavbar);
