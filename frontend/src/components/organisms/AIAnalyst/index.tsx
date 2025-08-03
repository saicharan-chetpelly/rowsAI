import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment, Stack } from '@mui/material';
import { IDeepDiveItem } from 'utils/types';
import Typography from 'components/atoms/Typography';
import Icon from 'components/atoms/Icon';
import TextField from 'components/atoms/TextField';
import Loader from 'components/atoms/loader';
import Drawer from 'components/molecules/Drawer';
import QuickInsights from 'components/molecules/QuickInsights';
import tableIcon from '@public/assets/icons/table.svg';
import aiAnalystIcon from '@public/assets/icons/ai-analyst.svg';
import analystDataHelpIcon from '@public/assets/icons/analyst-data-help.svg';
import rightArrowIcon from '@public/assets/icons/right-arrow.svg';
import favouriteIcon from '@public/assets/icons/heart.svg';
import refreshIcon from '@public/assets/icons/refresh.svg';
import aiAnalystLoaderIcon from '@public/assets/icons/analyst-loader.svg';
import theme from 'theme';
import {
  ANALYST_TITLE,
  ANALYST_FILL_DATA,
  ANALYST_TABLE_EMPTY_WARNING,
  ANALYST_TEXTFIELD_PLACEHOLER_TEXT,
  IMPORT_SAMPLE_DATA,
  NOT_SURE_TO_START,
  DEEP_DIVES_TITLE,
  AI_ANALYST_BETA_MODE_INFO,
  ANALYST_REFRESH_ICON_ALT_TEXT,
  ANALYST_LOADER_TEXT,
} from 'utils/constants';
import {
  AnalystDataStack,
  AnalystHeaderStack,
  ContainerStack,
  DataHelperStack,
  FeedbackBox,
  ImportDataButton,
  LoaderStack,
  NoDataBox,
} from './styled';
import DeepdiveCard from '../DeepdiveCard';
import useDataTable from 'pages/EditSpreadsheetPage/tableHook';

export interface AIAnalystProps {
  open: boolean;
  sheetTitle: string;
  analyzableData: any[];
  onClickImportData: () => void;
  onClickDeepDiveOption: (
    query: string,
    deepdiveName: string,
    menuItemId: string,
  ) => void;
  toggleAIAnalyst: () => void;
  quickInsighsData: Record<number, string>;
  deepdivesData: IDeepDiveItem[];
  askQuestionToAIanalyst: (question: string) => Promise<void>;
}

const AIAnalyst = ({
  open,
  sheetTitle,
  analyzableData,
  onClickImportData,
  onClickDeepDiveOption,
  toggleAIAnalyst,
  quickInsighsData,
  deepdivesData,
  askQuestionToAIanalyst,
}: AIAnalystProps) => {
  const { isLoading } = useDataTable();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(open);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    if (isLoading) {
      const loaderTimeout = setTimeout(() => setLoading(false), 2000);
      const loaderInterval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress < 100 ? prevProgress + 10 : 100,
        );
      }, 500);

      return () => {
        clearTimeout(loaderTimeout);
        clearInterval(loaderInterval);
      };
    }
  }, [drawerOpen, isLoading]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    toggleAIAnalyst();
  };

  const handleChangeUserPrompt = (event: ChangeEvent<HTMLInputElement>) => {
    const prompt = event.target.value;
    setUserPrompt(prompt);
  };
  const handleEnterKey = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await askQuestionToAIanalyst(userPrompt);
      }
    },
    [userPrompt],
  );

  if (!drawerOpen) {
    return null;
  }
  let content;
  if (analyzableData.length === 0) {
    content = (
      <NoDataBox>
        <DataHelperStack spacing="1rem">
          <Icon src={analystDataHelpIcon} alt="analyst-data-help-icon" />
          <Typography variant="h4">{ANALYST_TABLE_EMPTY_WARNING}</Typography>
          <Typography variant="body2">{ANALYST_FILL_DATA}</Typography>
          <Typography variant="body2">{NOT_SURE_TO_START}</Typography>
          <ImportDataButton onClick={onClickImportData}>
            <Typography
              variant="body2"
              color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
              {IMPORT_SAMPLE_DATA}
            </Typography>
          </ImportDataButton>
        </DataHelperStack>
      </NoDataBox>
    );
  } else if (loading) {
    content = (
      <LoaderStack spacing="3rem">
        <Icon src={aiAnalystLoaderIcon} alt="analyst-loader-icon" />
        <Typography
          variant="body2"
          color={theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}>
          {ANALYST_LOADER_TEXT}
        </Typography>
        <Loader progress={progress} />
      </LoaderStack>
    );
  } else {
    content = (
      <AnalystDataStack spacing="1rem">
        <Stack spacing="1.5rem">
          <TextField
            onKeyDown={handleEnterKey}
            value={userPrompt}
            onChange={handleChangeUserPrompt}
            placeholder={ANALYST_TEXTFIELD_PLACEHOLER_TEXT}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon src={aiAnalystIcon} alt="ai-analyst-icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Icon src={rightArrowIcon} alt="right-arrow-icon" />
                </InputAdornment>
              ),
            }}
          />
          <QuickInsights quickInsightsData={quickInsighsData} />
          <Stack spacing="1rem">
            <Typography variant="h6">{DEEP_DIVES_TITLE}</Typography>
            <Stack spacing="1rem">
              {deepdivesData.map((item: IDeepDiveItem) => (
                <DeepdiveCard
                  key={item.deepdiveId}
                  startIconSrc={item.startIconSrc}
                  startIconAlt={item.startIconAlt}
                  label={item.label}
                  deepdiveId={item.deepdiveId}
                  onDeepdiveMenuItemClick={onClickDeepDiveOption}
                  query={item.query}
                  deepdiveName={item.deepdiveName}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <FeedbackBox data-testid="feedback-box">
          <Typography
            variant="caption"
            color={theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}>
            {AI_ANALYST_BETA_MODE_INFO}
            <Box component="span" borderBottom={1}>
              feedback{' '}
            </Box>
            <Icon src={favouriteIcon} alt="favourite-icon" />
          </Typography>
        </FeedbackBox>
      </AnalystDataStack>
    );
  }

  return (
    <Drawer open={drawerOpen} position="right" onClose={handleDrawerClose}>
      <ContainerStack>
        <AnalystHeaderStack spacing="0.5rem">
          <Typography variant="h5">{ANALYST_TITLE}</Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing="0.5rem">
              <Icon src={tableIcon} alt="table-icon" />
              <Typography
                variant="body1"
                color={theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}>
                {sheetTitle}
              </Typography>
            </Stack>
            <IconButton>
              <Icon
                src={refreshIcon}
                alt={ANALYST_REFRESH_ICON_ALT_TEXT}
                width={theme.spacing(4)}
              />
            </IconButton>
          </Stack>
        </AnalystHeaderStack>
        {content}
      </ContainerStack>
    </Drawer>
  );
};

export default AIAnalyst;
