import React, { ChangeEvent, useCallback, useEffect } from 'react';
import Spreadsheet, {
  RangeSelection,
  Selection,
  Point,
} from 'react-spreadsheet';
import './styles.css';
import { Matrix } from 'utils/types';
import { useSpreadsheetContext } from 'utils/ThemeContext';
import { applyDynamicStyling, getColumnAlphabet } from 'utils/function';
import Typography from 'components/atoms/Typography';
import theme from 'theme';
import Tooltip from 'components/atoms/Tooltip';
import Icon from 'components/atoms/Icon';
import AiAnalystIcon from '@public/assets/icons/star.svg';
import FilterOptionsIcon from '@public/assets/icons/filter-options.svg';
import SortIcon from '@public/assets/icons/sort.svg';
import SearchIcon from '@public/assets/icons/search.svg';
import {
  AI_ANALYST_ICON_ALT_TITLE,
  AI_ANALYST_TOOLTIP_TITLE,
  FILTER_OPTIONS_ICON_ALT_TITLE,
  FILTER_OPTIONS_TOOLTIP_TITLE,
  SEARCH_OPTIONS_ICON_ALT_TITLE,
  SEARCH_OPTIONS_TOOLTIP_TITLE,
  SORT_OPTIONS_ICON_ALT_TITLE,
  SORT_OPTIONS_TOOLTIP_TITLE,
  SPREADSHEET_TITLE_PLACEHOLDER,
  SPREADSHEET_TITLE_WRAPPER,
} from 'utils/constants';

import {
  Container,
  BoldInputTextField,
  StyledButton,
  StyledIconsWrapper,
  StyledSpreadsheetNameWrapper,
  StyledTableHeaderWrapper,
} from './styled';

interface SpreadhseetComponentProps {
  id: string;
  data: Matrix<{
    value: string;
  }>;
  dataTableName: string;
  title: string;
  toggleAIAnalyst: (id: string) => void;
  editMode: boolean;
  handleEditMode: () => void;
  onDataTableNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
interface SpreadsheetState {
  title: string;
  textfieldVisible: boolean;
}
const Spreadhsheet = ({
  id,
  data,
  dataTableName,
  title,
  toggleAIAnalyst,
  editMode,
  handleEditMode,
  onDataTableNameChange,
  handleKeyDown,
}: SpreadhseetComponentProps) => {
  const {
    spreadsheetState,
    setCurrSelectedCell,
    setSelectedSpreadsheetRange,
    setActiveCell,
    setModifiedData,
  } = useSpreadsheetContext();

  const displayedTitle = editMode ? dataTableName : title;

  const handleSelect = useCallback(
    (selectedR: Selection) => {
      setSelectedSpreadsheetRange(selectedR as RangeSelection);
    },
    [setSelectedSpreadsheetRange],
  );
  const { selectedSpreadsheetRange, activeCell, modifiedData } =
    spreadsheetState;

  const handleActiveCell = useCallback(
    (point: Point) => {
      setModifiedData(null);
      setActiveCell(point);
      const { row, column } = point;
      const value = spreadsheetState.modifiedData?.[row]?.[column]?.value ?? '';
      const columAlphabet = getColumnAlphabet(column);
      setCurrSelectedCell([`${columAlphabet}${row + 1}`, value]);
    },
    [
      setCurrSelectedCell,
      setActiveCell,
      setModifiedData,
      spreadsheetState.modifiedData,
    ],
  );

  useEffect(() => {
    if (selectedSpreadsheetRange instanceof RangeSelection) {
      applyDynamicStyling(selectedSpreadsheetRange);
    }
  }, [selectedSpreadsheetRange]);

  useEffect(() => {
    if (modifiedData && activeCell) {
      handleActiveCell(activeCell);
    }
  }, [modifiedData, activeCell, handleActiveCell]);

  return (
    <Container id={`spreadsheet-${id}`}>
      <StyledTableHeaderWrapper>
        {!editMode ? (
          <StyledSpreadsheetNameWrapper
            onDoubleClick={handleEditMode}
            data-testid={SPREADSHEET_TITLE_WRAPPER}>
            <Typography
              variant="h6"
              color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
              {displayedTitle}
            </Typography>
          </StyledSpreadsheetNameWrapper>
        ) : (
          <BoldInputTextField
            variant="standard"
            value={title}
            name="spreadsheet-title"
            onChange={onDataTableNameChange}
            onKeyDown={handleKeyDown}
            placeholder={SPREADSHEET_TITLE_PLACEHOLDER}
          />
        )}

        <StyledIconsWrapper>
          <Tooltip title={AI_ANALYST_TOOLTIP_TITLE} placement="top">
            <StyledButton
              onClick={() => {
                toggleAIAnalyst(id);
              }}
              data-testid={AI_ANALYST_ICON_ALT_TITLE}>
              <Icon src={AiAnalystIcon} alt={AI_ANALYST_ICON_ALT_TITLE} />
            </StyledButton>
          </Tooltip>
          <Tooltip title={FILTER_OPTIONS_TOOLTIP_TITLE} placement="top">
            <StyledButton>
              <Icon
                src={FilterOptionsIcon}
                alt={FILTER_OPTIONS_ICON_ALT_TITLE}
              />
            </StyledButton>
          </Tooltip>
          <Tooltip title={SORT_OPTIONS_TOOLTIP_TITLE} placement="top">
            <StyledButton>
              <Icon src={SortIcon} alt={SORT_OPTIONS_ICON_ALT_TITLE} />
            </StyledButton>
          </Tooltip>
          <Tooltip title={SEARCH_OPTIONS_TOOLTIP_TITLE} placement="top">
            <StyledButton>
              <Icon src={SearchIcon} alt={SEARCH_OPTIONS_ICON_ALT_TITLE} />
            </StyledButton>
          </Tooltip>
        </StyledIconsWrapper>
      </StyledTableHeaderWrapper>
      <div className="spreadsheet-wrapper">
        <Spreadsheet
          data={data}
          className="custom-spreadsheet"
          onSelect={handleSelect}
          onActivate={handleActiveCell}
          onChange={(newData: Matrix<{ value: string }>) =>
            setModifiedData(newData)
          }
        />
      </div>
    </Container>
  );
};

export default Spreadhsheet;
