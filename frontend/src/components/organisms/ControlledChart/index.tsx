import React, { ChangeEvent, ReactNode, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import Typography from 'components/atoms/Typography';
import Icon from 'components/atoms/Icon';
import Menu from 'components/molecules/Menu';
import theme from 'theme';
import optionIcon from '@public/assets/icons/option.svg';
import editIcon from '@public/assets/icons/edit.svg';
import {
  CHART_EDIT_MENU,
  DELETE_CHART,
  EDIT_CHART_TOOLTIP_TEXT,
  RENAME_CHART,
} from 'utils/constants';
import Tooltip from 'components/atoms/Tooltip';
import { ChartHeaderStack, Circle, EditIcon, LabelStack } from './index.styles';
import { BoldInputTextField } from '../Spreadsheet/styled';

interface ILabel {
  name: string;
  color: string;
}

export interface IControlledChartProps {
  chartTitle: string;
  labels: ILabel[];
  chart: ReactNode;
  onChartModeChange: () => void;
  onChartDelete: () => void;
  style: React.CSSProperties;
}

const ControlledChart = ({
  chartTitle,
  labels,
  chart,
  onChartModeChange,
  onChartDelete,
  style,
}: IControlledChartProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editChartTitle, setEditChartTitle] = useState<boolean>(false);
  const [chartName, setChartName] = useState<string>(chartTitle);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditMode(!editMode);
    setAnchorEl(event.currentTarget);
  };

  const handeCloseEditMode = () => {
    setEditMode(false);
  };

  const handleChartNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChartName(event.target.value);
  };

  const handleMenuItemClick = (id: string) => {
    if (id === RENAME_CHART) {
      setEditChartTitle(true);
    } else if (id === DELETE_CHART) {
      onChartDelete();
    }
  };

  return (
    <Stack style={style}>
      <ChartHeaderStack direction="row">
        {editChartTitle ? (
          <BoldInputTextField
            name="chart-name-input"
            placeholder={chartName}
            variant="standard"
            value={chartName}
            onChange={handleChartNameChange}
          />
        ) : (
          <Typography variant="h6">{chartName}</Typography>
        )}
        <Stack direction="row">
          <Tooltip placement="top" title={EDIT_CHART_TOOLTIP_TEXT}>
            <IconButton onClick={onChartModeChange}>
              <EditIcon src={editIcon} alt="edit-chart-icon" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleOptionClick}>
            <Icon src={optionIcon} alt="option-icon" />
          </IconButton>

          <Menu
            menuData={CHART_EDIT_MENU}
            handleClose={handeCloseEditMode}
            handleMenuItemClick={handleMenuItemClick}
            anchorEl={anchorEl}
            open={editMode}
            menuWidth="15%"
          />
        </Stack>
      </ChartHeaderStack>
      <Stack>
        <Stack direction="row">
          {labels?.map((label: ILabel) => (
            <LabelStack key={label.name} direction="row" spacing="1rem">
              <Circle backgroundColor={label.color} />
              <Typography
                variant="body2"
                color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
                {label.name}
              </Typography>
            </LabelStack>
          ))}
        </Stack>
      </Stack>
      <Stack data-testid="chart" style={style}>
        {chart}
      </Stack>
    </Stack>
  );
};

export default ControlledChart;
