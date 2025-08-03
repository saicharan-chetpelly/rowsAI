import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  CartesianGrid,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
  Pie,
  Scatter,
  Cell,
} from 'recharts';
import theme from '../../../theme';

export enum ChartType {
  LINE_CHART,
  BAR_CHART,
  COMBO,
  STACKED_COLUMN,
  STACKED_BAR,
  SCATTER_CHART,
  PIE_CHART,
}

export interface ChartProps {
  type: ChartType;
  dataPoints: any[];
  dataKey: string[];
  chartColor?: string[];
  style?: React.CSSProperties;
}

const Chart = ({
  type,
  dataPoints,
  dataKey,
  chartColor = [
    theme.palette.primaryCustom.PRIMARY_DARK,
    theme.palette.green[100],
    theme.palette.red[100],
    theme.palette.yellow[100],
  ],
  style,
}: ChartProps) => {
  let chart = null;

  if (type === ChartType.LINE_CHART) {
    chart = (
      <LineChart style={style} data={dataPoints}>
        <CartesianGrid />
        <XAxis dataKey="name" axisLine={false} />
        <YAxis dataKey={dataKey[1]} axisLine={false} />
        <Tooltip />
        {dataKey?.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={chartColor?.[index]}
            activeDot={{ r: 5 }}
            name={key}
          />
        ))}
      </LineChart>
    );
  } else if (type === ChartType.BAR_CHART) {
    chart = (
      <BarChart data={dataPoints}>
        <CartesianGrid />
        <XAxis dataKey="name" axisLine={false} />
        <YAxis dataKey={dataKey[1]} axisLine={false} />
        <Tooltip />
        <Bar
          dataKey={dataKey[0]}
          fill={chartColor[0]}
          activeBar={{ stroke: theme.palette.stroke[300] }}
        />
      </BarChart>
    );
  } else if (type === ChartType.PIE_CHART) {
    chart = (
      <PieChart>
        <Pie
          dataKey={dataKey[0]}
          isAnimationActive
          data={dataPoints}
          fill={theme.palette.primaryCustom.PRIMARY_MEDIUM}
        />
        <Tooltip />
      </PieChart>
    );
  } else if (type === ChartType.SCATTER_CHART) {
    chart = (
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey={dataKey[0]} name={dataKey[0]} axisLine={false} />
        <YAxis dataKey={dataKey[1]} name={dataKey[1]} axisLine={false} />
        <Tooltip />
        <Scatter data={dataPoints}>
          {dataPoints.map((entry, index) => (
            <Cell
              key={`cell-${entry}`}
              fill={
                chartColor
                  ? chartColor[index % chartColor.length]
                  : theme.palette.green[100]
              }
            />
          ))}
        </Scatter>
      </ScatterChart>
    );
  } else if (type === ChartType.STACKED_COLUMN) {
    chart = (
      <BarChart data={dataPoints}>
        <CartesianGrid stroke={theme.palette.greyCustom[400]} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {dataKey?.map((key, index) => (
          <Bar key={key} dataKey={key} stackId="a" fill={chartColor?.[index]} />
        ))}
      </BarChart>
    );
  } else if (type === ChartType.STACKED_BAR) {
    chart = (
      <ComposedChart layout="vertical" data={dataPoints}>
        <CartesianGrid stroke={theme.palette.greyCustom[400]} />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="auto" />
        <Tooltip />
        {dataKey?.map((key, index) => (
          <Bar key={key} dataKey={key} stackId="a" fill={chartColor?.[index]} />
        ))}
      </ComposedChart>
    );
  } else if (type === ChartType.COMBO) {
    chart = (
      <ComposedChart data={dataPoints}>
        <CartesianGrid stroke={theme.palette.greyCustom[400]} />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey={dataKey[0]}
          fill={
            chartColor
              ? chartColor[0]
              : theme.palette.primaryCustom.PRIMARY_DARK
          }
        />
        <Line
          dataKey={dataKey[1]}
          type="linear"
          stroke={chartColor ? chartColor[1] : theme.palette.green[100]}
        />
      </ComposedChart>
    );
  }

  return <ResponsiveContainer>{chart}</ResponsiveContainer>;
};

export default Chart;
