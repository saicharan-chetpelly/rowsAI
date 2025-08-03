import React from 'react';
import { Box, Tab, Tabs, styled } from '@mui/material';

export const StyleTab = styled(Tab)(({ theme }) => ({
  padding: 0,
  paddingBottom: `${theme.spacing(1)}`,
  margin: 0,
  marginRight: `${theme.spacing(6)}`,
  minHeight: 0,
  minWidth: 0,
  textTransform: 'none',
  color: theme.palette.stroke[300],
  fontSize: '1.4rem',
  '&.Mui-selected': {
    borderBottom: `1px solid ${theme.palette.textCustom.TEXT_HIGH_EMPHASIS}`,
    color: theme.palette.textCustom.TEXT_HIGH_EMPHASIS,
  },
  '&:hover': {
    color: theme.palette.textCustom.TEXT_HIGH_EMPHASIS,
  },
}));

export const StyleTabs = styled(Tabs)(() => ({
  [`& .MuiTabs-indicator`]: {
    backgroundColor: 'transparent',
  },
}));

export const Container = styled(Box)(() => ({
  width: '100%',
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}>
    {value === index ? children : null}
  </div>
);

CustomTabPanel.defaultProps = {
  children: null,
};
