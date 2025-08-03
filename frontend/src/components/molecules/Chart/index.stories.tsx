import React from 'react';
import { Box } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import {
  BAR_GRAPH_DATA,
  LINE_GRAPH_DATA,
  SCATTER_GRAPH_DATA,
  PIE_GRAPH_DATA,
} from 'utils/graphData';
import theme from 'theme';
import Chart, { ChartType, ChartProps } from '.';

export default {
  title: 'Molecules/Chart',
  component: Chart,
} as Meta;

const Template: StoryFn<ChartProps> = (args) => (
  <Box style={{ width: '70vw', height: '50vh' }}>
    <Chart {...args} />
  </Box>
);
export const LineChart = Template.bind({});
LineChart.args = {
  type: ChartType.LINE_CHART,
  dataPoints: LINE_GRAPH_DATA,
  dataKey: ['uv'],
  chartColor: [theme.palette.primaryCustom.PRIMARY_MEDIUM],
};

export const BarChart = Template.bind({});
BarChart.args = {
  type: ChartType.BAR_CHART,
  dataPoints: BAR_GRAPH_DATA,
  dataKey: ['uv', 'pv'],
};

export const PieChart = Template.bind({});
PieChart.args = {
  type: ChartType.PIE_CHART,
  dataPoints: PIE_GRAPH_DATA,
  dataKey: ['value'],
};

export const ScatterChart = Template.bind({});
ScatterChart.args = {
  type: ChartType.SCATTER_CHART,
  dataPoints: SCATTER_GRAPH_DATA,
  dataKey: ['y', 'z'],
  chartColor: [
    theme.palette.primaryCustom.PRIMARY_MEDIUM,
    theme.palette.green[100],
  ],
};

export const ComboChart = Template.bind({});
ComboChart.args = {
  type: ChartType.COMBO,
  dataPoints: BAR_GRAPH_DATA,
  dataKey: ['uv', 'pv'],
};

export const StackedBarChart = Template.bind({});
StackedBarChart.args = {
  type: ChartType.STACKED_BAR,
  dataPoints: BAR_GRAPH_DATA,
  dataKey: ['uv', 'pv'],
  chartColor: [
    theme.palette.primaryCustom.PRIMARY_MEDIUM,
    theme.palette.green[100],
  ],
};

export const StackedColumnChart = Template.bind({});
StackedColumnChart.args = {
  type: ChartType.STACKED_COLUMN,
  dataPoints: BAR_GRAPH_DATA,
  dataKey: ['uv', 'pv'],
  chartColor: [
    theme.palette.primaryCustom.PRIMARY_MEDIUM,
    theme.palette.green[100],
  ],
};
