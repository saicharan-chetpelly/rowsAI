import React from 'react';
import { Grid, InputAdornment, Stack } from '@mui/material';
import Typography from 'components/atoms/Typography';
import TextField from 'components/atoms/TextField';
import Icon from 'components/atoms/Icon';
import Button from 'components/atoms/Button';
import Drawer from 'components/molecules/Drawer';
import { IPlatform } from 'utils/types';
import theme from 'theme';
import searchIcon from '@public/assets/icons/search.svg';
import rightIcon from '@public/assets/icons/right-icon.svg';
import importFileIcon from '@public/assets/icons/import-file.svg';
import {
  DATA_ACTION_IMPORT_INPUT_TESTID,
  DATA_ACTIONS_TITLE,
  IMPORT_CSV_XLSX_FILE,
  IMPORT_DATA,
  IMPORT_FILE_BUTTON_TESTID,
  IMPORT_FILE_SUPPORT,
  IMPORT_FILE_TEXT,
  IMPORT_PLATEFORM_DATA_OPTION,
  SEARCH_ACTIONS_PLACEHOLDER,
  SEE_ALL_TEXT,
  SEND_DATA,
  SEND_DATA_TO_PLATFORM_OPTION,
} from 'utils/constants';

import {
  DataActionGrid,
  ImportFileButton,
  ImportFileStack,
  ImportHeaderStack,
  PlatformButtonBox,
  PlatformOptionButton,
} from './styles';
import useDataActions from './hook';

export interface DataActionsProps {
  open: boolean;
  toggleDataActions: () => void;
  createPageAndUploadFile: (file: File) => void;
}

const DataActions = ({
  open,
  toggleDataActions,
  createPageAndUploadFile,
}: DataActionsProps) => {
  const {
    action,
    fileInputRef,
    handleImportFileChange,
    handleChangeAction,
    handleChooseFileClick,
  } = useDataActions(createPageAndUploadFile);

  return (
    <Drawer open={open} position="right" onClose={toggleDataActions}>
      <DataActionGrid direction="column" spacing="1.5rem" container>
        <Grid item>
          <Stack spacing="1rem">
            <Typography
              variant="h5"
              color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
              {DATA_ACTIONS_TITLE}
            </Typography>
            <TextField
              value={action}
              onChange={handleChangeAction}
              placeholder={SEARCH_ACTIONS_PLACEHOLDER}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon src={searchIcon} alt="search-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Grid>
        <Grid item>
          <ImportFileStack spacing="1.5rem">
            <Typography
              variant="subtitle1"
              color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
              {IMPORT_FILE_TEXT}
            </Typography>
            <input
              data-testid={DATA_ACTION_IMPORT_INPUT_TESTID}
              type="file"
              id="fileInput"
              accept={IMPORT_FILE_SUPPORT}
              style={{ display: 'none' }}
              multiple={false}
              ref={fileInputRef}
              onChange={handleImportFileChange}
            />
            <ImportFileButton
              data-testid={IMPORT_FILE_BUTTON_TESTID}
              variant="outlined"
              startIcon={<Icon src={importFileIcon} alt="import-file-icon" />}
              onClick={handleChooseFileClick}>
              <Typography
                variant="caption"
                color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
                {IMPORT_CSV_XLSX_FILE}
              </Typography>
            </ImportFileButton>
          </ImportFileStack>
        </Grid>
        <Grid item>
          <ImportHeaderStack direction="row">
            <Typography
              variant="subtitle1"
              color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
              {IMPORT_DATA}
            </Typography>
            <Button
              variant="text"
              endIcon={<Icon src={rightIcon} alt="right-icon" />}>
              <Typography
                variant="body2"
                color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
                {SEE_ALL_TEXT}
              </Typography>
            </Button>
          </ImportHeaderStack>
          <PlatformButtonBox gap="1rem">
            {IMPORT_PLATEFORM_DATA_OPTION.map((platformOption: IPlatform) => (
              <PlatformOptionButton key={platformOption.id}>
                <Icon
                  src={platformOption.icon}
                  alt={platformOption.alt}
                  width="30px"
                />
                <Typography variant="body2">{platformOption.title}</Typography>
              </PlatformOptionButton>
            ))}
          </PlatformButtonBox>
        </Grid>
        <Grid item>
          <ImportHeaderStack direction="row">
            <Typography
              variant="subtitle1"
              color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
              {SEND_DATA}
            </Typography>
            <Button
              variant="text"
              endIcon={<Icon src={rightIcon} alt="right-icon" />}>
              <Typography
                variant="body2"
                color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
                {SEE_ALL_TEXT}
              </Typography>
            </Button>
          </ImportHeaderStack>
          <PlatformButtonBox gap="1rem">
            {SEND_DATA_TO_PLATFORM_OPTION.map((platformOption: IPlatform) => (
              <PlatformOptionButton key={platformOption.id}>
                <Icon
                  src={platformOption.icon}
                  alt={platformOption.alt}
                  width="30px"
                />
                <Typography variant="body2">{platformOption.title}</Typography>
              </PlatformOptionButton>
            ))}
          </PlatformButtonBox>
        </Grid>
      </DataActionGrid>
    </Drawer>
  );
};

export default DataActions;
