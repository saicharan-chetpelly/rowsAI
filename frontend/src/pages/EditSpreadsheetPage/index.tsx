import React, { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import RowColInfo from 'components/molecules/RowColInfo';
import SpreadsheetSubHeader from 'components/organisms/SpreadsheetSubHeader';
import AIAnalyst from 'components/organisms/AIAnalyst';
import SpreadsheetTemplate from 'templates/SpreadsheetTemplate';
import Header from 'components/molecules/Header';
import {
  CHART_SELECT_MENU_OPTIONS_DATA,
  INSERT_MENU,
  SPREADSHEET_DUMMY_DATA,
} from 'utils/constants';
import { useSpreadsheetContext } from 'utils/ThemeContext';
import ChartEditor from 'components/organisms/ChartEditor';
import DataActions from 'components/organisms/DataActions';
import {
  fetchDataAndUpdateState,
  processSelectedSpreadsheetRange,
  updatePageAndDataTableContext,
} from 'utils/function';
import { Matrix } from 'react-spreadsheet';
import { useFileContext } from 'utils/context/FileContext';
import { ChartLabel } from 'utils/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { createNewPage, fetchAllPages } from 'services';
import Navbar from '../../components/organisms/Navbar';
import {
  BodyContainer,
  RowColInfoContainer,
  SpreadsheetSubHeaderContainer,
} from './styled';
import MainBody from './mainBody';
import useFiles from './fileHook';
import useNavigation from './navHook';
import useDataTable from './tableHook';

const EditSpreadSheetPage = () => {
  const { state } = useLocation();
  const { openFileSelection, spreadsheetId } = state || {};
  const navigate = useNavigate();
  const { fetchPagesAndDataTables } = useNavigation();
  const [showSideNav, setShowSideNav] = useState<boolean>(true);
  const [showChartEditor, setShowChartEditor] = useState<boolean>(false);
  const [showAIAnalyst, setShowAIAnalyst] = useState<boolean>(false);
  const [showDataActions, setShowDataActions] = useState<boolean>(
    openFileSelection ?? false,
  );
  const [currActiveDataTableId, setCurrActiveDataTableId] = useState<number>();
  const [editSheetId, setEditSheetId] = useState<string>('');
  const [chartData, setChartData] = useState<[]>([]);
  const [datakeys, setDatakeys] = useState<[]>([]);
  const [chartLabels, setChartLabels] = useState<ChartLabel[]>([]);
  const [dataState, setDataState] = useState<
    Matrix<{
      value: string;
    }>
  >([]);
  const [createdDataId, setCreatedDataId] = useState<number>();
  const [createdDataTableName, setCreatedDataTableName] = useState<string>();
  const handleUpdateDatatTableId = (id: number, title: string) => {
    setCreatedDataId(id);
    setCreatedDataTableName(title);
  };

  const { uploadNewFileAsDataTable } = useFiles(handleUpdateDatatTableId);
  const uploadFileInDatabase = async (pageId: number, file: File) => {
    await uploadNewFileAsDataTable(pageId, file);
  };

  const {
    spreadsheetState,
    setSelectedCharts,
    setSelectedChartType,
    setSpreadsheetsData,
    setActivePageId,
    setActivePageTitle,
    setPageAndDataTablesData,
    clearPageAndDataTableData,
  } = useSpreadsheetContext();
  const {
    currSelectedCell,
    selectedSpreadsheetRange,
    selectedCharts,
    selectedChartType,
    spreadsheetsData,
    activePageTitle,
    currActiveSpreadsheetId,
    pageAndDataTablesData,
    activePageId,
  } = spreadsheetState;

  const createPageinDatabase = async () => {
    const res = await fetchAllPages(currActiveSpreadsheetId);
    if (res?.status === 200) {
      const numOfPages = res.data.length;
      const response = await createNewPage(
        currActiveSpreadsheetId,
        `Page ${numOfPages + 1}`,
      );
      if (response?.status === 200) {
        setActivePageId(response.data.id);
        setActivePageTitle(response.data.title);
        return response.data.id;
      }
    }
    return '';
  };
  const createPageAndUploadFile = async (file: File) => {
    const res = await createPageinDatabase();
    await uploadFileInDatabase(res, file);
  };

  const {
    fetchQuickInsights,
    quickInsights,
    deepdives,
    fetchDeepdives,
    getDeepdiveDataTableFileContentByQuery,
    isQuestionAsked,
    askQuestion,
  } = useDataTable();

  const [currEditableChartIndex, setCurrEditableChartIndex] = useState<number>(
    selectedCharts?.length !== undefined
      ? Math.max(selectedCharts.length - 1, 0)
      : 0,
  );
  const handleSidebarClick = () => {
    setShowSideNav(!showSideNav);
  };

  const { fileContent } = useFileContext();
  const [fileData, setFileData] = useState<any[] | null>(fileContent);
  const handleMenuItem = (menuItemId: string) => {
    if (menuItemId === INSERT_MENU[3].menuItemID) {
      setShowAIAnalyst(false);
      setShowDataActions(false);
      setShowChartEditor(true);
      setSelectedChartType(CHART_SELECT_MENU_OPTIONS_DATA[0].value);
      setSelectedCharts(
        selectedChartType,
        selectedSpreadsheetRange,
        datakeys,
        chartData,
        chartLabels,
      );
      setCurrEditableChartIndex(
        selectedCharts?.length !== undefined
          ? Math.max(selectedCharts.length, 0)
          : 0,
      );
    }
  };

  const handleDeepdiveInsertTable = async (
    query: string,
    deepDiveName: string,
    menuItemId: string,
  ) => {
    if (menuItemId === '1') {
      const fileResponse = await getDeepdiveDataTableFileContentByQuery(
        query,
        deepDiveName,
      );
      await uploadFileInDatabase(activePageId, fileResponse);
      setDataState(SPREADSHEET_DUMMY_DATA);
      const numberOfSpreadsheets = spreadsheetsData
        ? spreadsheetsData.length
        : 0;
      setSpreadsheetsData(
        `Table ${numberOfSpreadsheets + 1}`,
        SPREADSHEET_DUMMY_DATA,
      );
    }
  };
  const toggleChartEditor = () => {
    setShowChartEditor(false);
  };
  const toggleAIAnalyst = async (id: string) => {
    const datatTableId = parseInt(id, 10);
    setCurrActiveDataTableId(datatTableId);
    setShowChartEditor(false);
    setShowDataActions(false);
    setShowAIAnalyst(!showAIAnalyst);
    await fetchQuickInsights(
      currActiveSpreadsheetId,
      activePageId,
      datatTableId,
    );
    await fetchDeepdives(currActiveSpreadsheetId, activePageId, datatTableId);
  };
  useEffect(() => {
    if (isQuestionAsked) {
      const fetchQuickInsightsAndDeepdives = async () => {
        await fetchQuickInsights(
          currActiveSpreadsheetId,
          activePageId,
          currActiveDataTableId,
        );
        await fetchDeepdives(
          currActiveSpreadsheetId,
          activePageId,
          currActiveDataTableId,
        );
      };
      fetchQuickInsightsAndDeepdives();
    }
  }, [isQuestionAsked, currActiveDataTableId]);
  const handleDataActions = () => {
    setShowAIAnalyst(false);
    setShowChartEditor(false);
    setShowDataActions(!showDataActions);
  };
  const handleViewButtonClick = () => {
    navigate(`/view/${currActiveSpreadsheetId}`, {
      state: { spreadsheetId: currActiveSpreadsheetId },
    });
  };
  const handleRowLogoClick = () => {
    navigate('/');
  };
  const handleModeChange = (id: string, type: string) => {
    const chartIndex = selectedCharts.findIndex((chart) => chart.id === id);

    if (chartIndex !== -1 && selectedCharts) {
      const updatedChart = {
        id: selectedCharts[chartIndex].id,
        range: selectedCharts[chartIndex].rangeSelection,
        dataKeys: selectedCharts[chartIndex].dataKeys,
        chartData: selectedCharts[chartIndex].chartData,
        chartLabels: selectedCharts[chartIndex].chartLabels,
        value: type,
      };

      setSelectedCharts(
        type,
        updatedChart.range,
        updatedChart.dataKeys as [],
        updatedChart.chartData as [],
        updatedChart.chartLabels,
        updatedChart.id,
      );
      setCurrEditableChartIndex(chartIndex);
    }
    setSelectedChartType(type);
  };
  const fileDataRef = useRef<number>(fileData?.length);
  useEffect(() => {
    fetchDataAndUpdateState(
      fileDataRef,
      fileData,
      fileContent,
      setDataState,
      setSpreadsheetsData,
      spreadsheetsData,
      createdDataId,
      createdDataTableName,
    );
  }, [fileData, createdDataId]);

  useEffect(() => {
    setFileData(fileContent);
  }, [fileContent]);
  useEffect(() => {
    processSelectedSpreadsheetRange(
      selectedSpreadsheetRange,
      dataState,
      setDatakeys,
      setChartData,
      setChartLabels,
    );
  }, [selectedSpreadsheetRange, dataState]);

  useEffect(() => {
    if (selectedChartType && selectedCharts && selectedCharts.length > 0) {
      const currChartId = selectedCharts[currEditableChartIndex].id;
      const currChart = selectedCharts.find((ch) => ch.id === currChartId);
      if (showChartEditor && currChart) {
        setSelectedCharts(
          selectedChartType,
          currChart.rangeSelection,
          currChart.dataKeys,
          currChart.chartData,
          currChart.chartLabels,
          currChartId,
        );
      }
    }
  }, [selectedChartType, currEditableChartIndex]);

  const askQuestionToAIanalyst = async (question: string) => {
    await askQuestion(question, currActiveDataTableId);
  };

  useEffect(() => {
    const updatePagesAndDataTables = async () => {
      clearPageAndDataTableData();
      const response = await fetchPagesAndDataTables(
        currActiveSpreadsheetId,
        setActivePageId,
        setActivePageTitle,
        createdDataId,
      );
      updatePageAndDataTableContext(response, setPageAndDataTablesData);
    };
    updatePagesAndDataTables();
  }, [spreadsheetId, createdDataId]);

  return (
    <>
      <SpreadsheetTemplate
        header={<Header onRowLogoClick={handleRowLogoClick} />}
        sideNav={
          <Stack
            direction="column"
            sx={{ display: showSideNav ? 'initial' : 'none' }}>
            <Navbar
              activePage={activePageTitle}
              variant="page"
              pageNavItemData={pageAndDataTablesData}
              setDataState={setDataState}
            />
          </Stack>
        }
        bodyContent={
          <BodyContainer>
            <Stack
              width={
                showDataActions || showAIAnalyst || showChartEditor
                  ? '74%'
                  : '100%'
              }>
              <SpreadsheetSubHeaderContainer data-testid="insert-menu-container">
                <SpreadsheetSubHeader
                  handleDataActions={handleDataActions}
                  handleMenuItemClick={handleMenuItem}
                  handleSidebar={handleSidebarClick}
                  handleViewButton={handleViewButtonClick}
                />
              </SpreadsheetSubHeaderContainer>
              <RowColInfoContainer>
                <RowColInfo
                  rowColInfoData={currSelectedCell[1]}
                  rowColInfoText={currSelectedCell[0]}
                />
              </RowColInfoContainer>
              <MainBody
                toggleAIAnalyst={(id) => toggleAIAnalyst(id)}
                handleModeChange={handleModeChange}
                editSheetId={editSheetId}
                setEditSheetId={setEditSheetId}
              />
            </Stack>
          </BodyContainer>
        }
      />
      {showChartEditor && (
        <ChartEditor
          open={showChartEditor}
          toggleChartEditor={toggleChartEditor}
        />
      )}
      {showAIAnalyst && (
        <AIAnalyst
          analyzableData={['data']}
          onClickDeepDiveOption={handleDeepdiveInsertTable}
          onClickImportData={() => {}}
          sheetTitle="Table1"
          open={showAIAnalyst}
          toggleAIAnalyst={() => toggleAIAnalyst}
          quickInsighsData={quickInsights}
          deepdivesData={deepdives}
          askQuestionToAIanalyst={askQuestionToAIanalyst}
        />
      )}
      {showDataActions && (
        <DataActions
          open={showDataActions}
          toggleDataActions={handleDataActions}
          createPageAndUploadFile={createPageAndUploadFile}
        />
      )}
    </>
  );
};

export default React.memo(EditSpreadSheetPage);
