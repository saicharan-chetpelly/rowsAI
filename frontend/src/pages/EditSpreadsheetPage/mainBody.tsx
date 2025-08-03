import React, { ChangeEvent, useState } from 'react';
import Typography from 'components/atoms/Typography';
import Spreadhsheet from 'components/organisms/Spreadsheet';
import theme from 'theme';
import ControlledChart from 'components/organisms/ControlledChart';
import Chart from 'components/molecules/Chart';
import { Box } from '@mui/material';
import { useSpreadsheetContext } from 'utils/ThemeContext';
import { SPREADSHEET_EMPTY_DATA } from 'utils/constants';
import { MainContainer, StyledStack, TitleContainer } from './styled';
import useFiles from './fileHook';
import { getSelectedChartType } from 'utils/function';

interface MainBodyProps {
  toggleAIAnalyst: (id: string) => void;
  handleModeChange: (id: string, value: string) => void;
  editSheetId: string;
  setEditSheetId: React.Dispatch<React.SetStateAction<string>>;
}
const MainBody = ({
  toggleAIAnalyst,
  handleModeChange,
  editSheetId,
  setEditSheetId,
}: MainBodyProps) => {
  const { spreadsheetState, setPageAndDataTablesData } =
    useSpreadsheetContext();
  const {
    pageAndDataTablesData,
    selectedCharts,
    activePageTitle,
    activePageId,
  } = spreadsheetState;
  const [sheetName, setSheetName] = useState<string>('Table 1');
  const { updateDataTableTitleById } = useFiles(() => {});
  const handleSheetNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetName(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      pageAndDataTablesData?.forEach((pageData) => {
        pageData.dataTableData.forEach((spreadsheet) => {
          if (
            pageData.navItemId === activePageId?.toString() &&
            spreadsheet.id === editSheetId
          ) {
            updateDataTableTitleById(spreadsheet.id, sheetName);
            setPageAndDataTablesData(
              pageData.navItemId,
              pageData.text,
              pageData.dataTableData.map((dataTable) => {
                if (dataTable.id === editSheetId) {
                  return { ...dataTable, title: sheetName };
                }
                return dataTable;
              }),
            );
            setEditSheetId('');
          }
        });
      });
    }
  };

  const handleEditOption = (id: string) => {
    setEditSheetId(id);
    const sheetToEdit = pageAndDataTablesData
      ?.flatMap((pageData) => pageData.dataTableData)
      .find((sheet) => sheet.id === id);
    setSheetName(sheetToEdit ? sheetToEdit.title : '');
  };

  return (
    <StyledStack>
      <TitleContainer>
        <Typography variant="h4">{activePageTitle}</Typography>
      </TitleContainer>
      <MainContainer>
        {pageAndDataTablesData === null ||
        pageAndDataTablesData?.length === 0 ? (
          <Spreadhsheet
            key={SPREADSHEET_EMPTY_DATA.id}
            data={SPREADSHEET_EMPTY_DATA.data}
            dataTableName={SPREADSHEET_EMPTY_DATA.title}
            title={SPREADSHEET_EMPTY_DATA.title}
          />
        ) : (
          pageAndDataTablesData
            .filter(
              (pageData) => pageData.navItemId === activePageId?.toString(),
            )
            .flatMap((pageData) => pageData.dataTableData)
            .map((spreadsheet) => (
              <Spreadhsheet
                title={
                  editSheetId === spreadsheet.id && sheetName !== ''
                    ? sheetName
                    : spreadsheet.title
                }
                key={spreadsheet.id}
                data={spreadsheet.data}
                dataTableName={sheetName}
                toggleAIAnalyst={() => toggleAIAnalyst(spreadsheet.id)}
                id={spreadsheet.id}
                onDataTableNameChange={handleSheetNameChange}
                handleKeyDown={handleKeyDown}
                handleEditMode={() =>
                  handleEditOption(spreadsheet.id.toString())
                }
                editMode={editSheetId === spreadsheet.id}
              />
            ))
        )}
      </MainContainer>
      <Box
        style={{
          width: '60vw',
          height: '30vh',
          marginTop: theme.spacing(10),
        }}>
        {selectedCharts?.map((chart) => (
          <ControlledChart
            key={chart.dataKeys[0]}
            chartTitle="Chart"
            onChartDelete={() => {}}
            labels={chart.chartLabels}
            onChartModeChange={() => {
              handleModeChange(chart.id, chart.value);
            }}
            style={{ width: '40vw', height: '40vh' }}
            chart={
              <Chart
                type={getSelectedChartType(chart.value)}
                dataPoints={chart.chartData}
                dataKey={chart.dataKeys}
              />
            }
          />
        ))}
      </Box>
    </StyledStack>
  );
};

export default MainBody;
