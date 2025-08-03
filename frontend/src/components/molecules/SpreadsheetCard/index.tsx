import React, { ChangeEvent } from 'react';
import { IconButton, Stack } from '@mui/material';
import {
  OPEN_IN_VIEW_MODE,
  OPTIONS,
  SHEET_RENAME_PLACEHOLDER,
} from 'utils/constants';
import Icon from 'components/atoms/Icon';
import theme from 'theme';
import TextField from 'components/atoms/TextField';
import Tooltip from '../../atoms/Tooltip';
import Typography from '../../atoms/Typography';
import eyeIcon from '../../../../public/assets/icons/eye.svg';
import spreadsheetIcon from '../../../../public/assets/icons/spreadsheet.svg';
import optionIcon from '../../../../public/assets/icons/option.svg';
import { SpreadsheetBox } from './styled';

export interface SpreadsheetCardProps {
  title: string;
  folder: string;
  lastModified: string;
  editMode: boolean;
  onClick: () => void;
  onViewModeClick: () => void;
  onEditMode: () => void;
  onSheetNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  sheetName: string;
}

const SpreadsheetCard = ({
  title,
  folder,
  lastModified,
  editMode,
  onClick,
  onViewModeClick,
  onEditMode,
  onSheetNameChange,
  onKeyDown,
  sheetName
}: SpreadsheetCardProps) => {
  const displayedTitle = editMode ? sheetName : title;
  const stopPropagationHandler =
    (callback: () => void) => (e: React.MouseEvent) => {
      e.stopPropagation();
      callback();
    };

  return (
    <SpreadsheetBox data-testid={`${title}-spreadsheet-card`} onClick={onClick}>
      <Stack direction="row" spacing="1rem" alignItems="center">
        <Icon src={spreadsheetIcon} alt="spreadsheet-icon" />
        {editMode ? (
          <TextField
            placeholder={SHEET_RENAME_PLACEHOLDER}
            variant="standard"
            value={title}
            autoFocus
            onChange={onSheetNameChange}
            onKeyDown={onKeyDown}
          />
        ) : (
          <Typography
            variant="body1"
            color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
            {displayedTitle}
          </Typography>
        )}
      </Stack>
      <Typography
        variant="body2"
        color={theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}>
        {`In ${folder}`}
      </Typography>
      <Typography
        variant="body2"
        color={theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}>
        {`Modified ${lastModified}`}
      </Typography>
      <Stack direction="row" alignItems="center">
        <Tooltip title={OPEN_IN_VIEW_MODE} placement="top">
          <IconButton
            data-testid={`${title}-view-button`}
            onClick={stopPropagationHandler(onViewModeClick)}>
            <Icon src={eyeIcon} alt="eye-icon" />
          </IconButton>
        </Tooltip>
        <Tooltip title={OPTIONS} placement="top">
          <IconButton
            onClick={stopPropagationHandler(onEditMode)}
            data-testid={`${title}-edit-button`}>
            <Icon src={optionIcon} alt="option-icon" />
          </IconButton>
        </Tooltip>
      </Stack>
    </SpreadsheetBox>
  );
};

export default SpreadsheetCard;
