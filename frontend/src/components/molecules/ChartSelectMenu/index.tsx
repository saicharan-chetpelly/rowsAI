import React, { useState } from 'react';
import { Box, ListItemText, MenuItem, SelectChangeEvent } from '@mui/material';
import theme from 'theme';
import { CHART_ALT_TEXT, TICK_ALT_TEXT } from 'utils/constants';
import Typography from 'components/atoms/Typography';
import { useSpreadsheetContext } from 'utils/ThemeContext';
import Icon from '../../atoms/Icon';
import TickIcon from '../../../../public/assets/icons/tickIcon.svg';
import {
  StyledFormfield,
  StyledIconTypography,
  StyledMenuItemContainer,
  StyledSelect,
} from './styled';

export interface ChartSelectMenuProps {
  MenuOptionsData: MenuOptionsInterface[];
  defaultValue?: string;
}
export interface MenuOptionsInterface {
  icon?: string;
  label: string;
  value: string;
}

const ChartSelectMenu = ({
  MenuOptionsData,
  defaultValue,
}: ChartSelectMenuProps) => {
  const { setSelectedChartType, spreadsheetState } = useSpreadsheetContext();
  const { selectedChartType } = spreadsheetState;
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue ?? selectedChartType,
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedValue(event.target.value as string);
    setSelectedChartType(event.target.value as string);
  };

  const renderValue = (value: string) => {
    const option = MenuOptionsData.find((o) => o.value === value);
    if (!option) {
      return null;
    }
    return (
      <StyledIconTypography>
        {option.icon && <Icon src={option.icon} alt="icon" />}
        <Typography variant="body2">{option.label}</Typography>
      </StyledIconTypography>
    );
  };

  return (
    <Box sx={{ boxShadow: 0 }}>
      <StyledFormfield fullWidth variant="standard">
        <StyledSelect
          value={selectedValue}
          onChange={handleChange}
          renderValue={() => renderValue(selectedValue)}>
          {MenuOptionsData.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={{
                background:
                  selectedValue === option.value
                    ? theme.palette.structural[50]
                    : 'transparent',
              }}>
              <ListItemText
                primary={
                  <StyledMenuItemContainer>
                    <StyledIconTypography>
                      {option.icon && (
                        <Icon src={option.icon} alt={CHART_ALT_TEXT} />
                      )}
                      <Typography variant="body2">{option.label}</Typography>
                    </StyledIconTypography>
                    {selectedValue === option.value && (
                      <Icon src={TickIcon} alt={TICK_ALT_TEXT} />
                    )}
                  </StyledMenuItemContainer>
                }
              />
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormfield>
    </Box>
  );
};

export default ChartSelectMenu;
