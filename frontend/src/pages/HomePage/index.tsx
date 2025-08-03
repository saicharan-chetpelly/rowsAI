import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import SpreadsheetTemplate from 'templates/SpreadsheetTemplate';
import Header from 'components/molecules/Header';
import Navbar from 'components/organisms/Navbar';
import HomeSubHeader from 'components/organisms/HomeSubHeader';
import SpreadsheetCard from 'components/molecules/SpreadsheetCard';
import {
  RECENT_ACTIVITY_TEXT,
} from 'utils/constants';
import Typography from 'components/atoms/Typography';
import theme from 'theme';
import {
  ContentStack,
  RecentActivityStack,
  StyledScrollableWrapper,
} from './styled';
import { useNavigate } from 'react-router-dom';
import useSpreadsheet from './hooks';
import { useSpreadsheetContext } from 'utils/ThemeContext';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    fetchAllSpreadsheets,
    spreadSheets,
    setSpreadSheets,
    updateSpreadsheetTitle,
    createSpreadsheet,
  } = useSpreadsheet();
  const { setCurrActiveSpreadsheetId } = useSpreadsheetContext();
  const [editSheetId, setEditSheetId] = useState<string>('');
  const [sheetName, setSheetName] = useState<string>('');

  const handleSheetNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetName(event.target.value);
  };

  const handleBackNavigation = () => {
    navigate('/');
  };

  const handleEditOption = (id: string) => {
    setEditSheetId(id);
    const sheetToEdit = spreadSheets.find((sheet) => sheet.id === id);
    setSheetName(sheetToEdit ? sheetToEdit.title : '');
  };

  const handleClickSpreadsheetCard = (id: string) => {
    const currSpreadsheetId = parseInt(id, 10);
    setCurrActiveSpreadsheetId(currSpreadsheetId);
    navigate(`/edit/${id}`);
  };

  const handleCreateSpreadsheetOption = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const response = await createSpreadsheet();
    setCurrActiveSpreadsheetId(response.id);
    navigate(`/edit/${response.id}`, {
      state: { openFileSelection: true, spreadsheetId: response.id },
    });
  };

  const handleSpreadsheetViewMode = (id: string) => {
    setEditSheetId('');
    setCurrActiveSpreadsheetId(parseInt(id, 10));
    navigate(`/view/${id}`, { state: { spreadsheetId: id } });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const updatedSpreadsheets = spreadSheets.map((spreadsheet) => {
        if (spreadsheet.id === editSheetId) {
          updateSpreadsheetTitle(spreadsheet.id, sheetName);
          return { ...spreadsheet, title: sheetName };
        }
        return spreadsheet;
      });
      setSpreadSheets(updatedSpreadsheets);
      setEditSheetId('');
    }
  };
  useEffect(() => {
    const fetchAll = async () => {
      await fetchAllSpreadsheets();
    };
    fetchAll();
  }, []);

  return (
    <SpreadsheetTemplate
      header={<Header onRowLogoClick={handleBackNavigation} />}
      sideNav={<Navbar variant="default" activePage="home" />}
      bodyContent={
        <ContentStack>
          <Box>
            <HomeSubHeader handleClick={handleCreateSpreadsheetOption} />
          </Box>
          <StyledScrollableWrapper>
            <RecentActivityStack spacing="1rem">
              <Typography
                variant="body2"
                color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
                {RECENT_ACTIVITY_TEXT}
              </Typography>
              <Divider />
            </RecentActivityStack>
            <Stack data-TestId="spreadsheet-card">
              {spreadSheets.map((spreadsheet) => (
                <SpreadsheetCard
                  key={spreadsheet.id}
                  title={
                    editSheetId === spreadsheet.id && sheetName !== ''
                      ? sheetName
                      : spreadsheet.title
                  }
                  folder={spreadsheet.categoryType}
                  lastModified={spreadsheet.lastModified}
                  onClick={() => handleClickSpreadsheetCard(spreadsheet.id)}
                  onViewModeClick={() =>
                    handleSpreadsheetViewMode(spreadsheet.id)
                  }
                  editMode={editSheetId === spreadsheet.id}
                  onEditMode={() => handleEditOption(spreadsheet.id)}
                  onSheetNameChange={handleSheetNameChange}
                  onKeyDown={handleKeyDown}
                  sheetName={sheetName}
                />
              ))}
            </Stack>
          </StyledScrollableWrapper>
        </ContentStack>
      }
    />
  );
};

export default HomePage;
