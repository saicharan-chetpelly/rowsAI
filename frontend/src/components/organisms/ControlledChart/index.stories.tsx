import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ControlledChart from '.';
import Chart, { ChartType } from '../../molecules/Chart';
import theme from '../../../theme';
import { LINE_GRAPH_DATA } from '../../../utils/graphData';

export default {
  title: 'Organisms/ControlledChart',
  component: ControlledChart,
} as Meta;

const Template: StoryFn<typeof ControlledChart> = (args) => (
  <ControlledChart {...args} />
);

export const Default = Template.bind({});

Default.args = {
  chartTitle: 'Chart 1',
  labels: [
    { name: 'Label 1', color: theme.palette.green[100] },
    { name: 'Label 2', color: theme.palette.red[200] },
    { name: 'Label 3', color: theme.palette.yellow[100] },
  ],
  chart: (
    <Chart
      type={ChartType.LINE_CHART}
      dataPoints={LINE_GRAPH_DATA}
      chartColor={[theme.palette.primaryCustom.PRIMARY_DARK]}
      dataKey={['uv']}
    />
  ),
  style: { width: '40vw', height: '40vh' },
  onChartModeChange: action('Chart mode change button clicked'),
  onChartDelete: action('Chart delete button clicked'),
};
