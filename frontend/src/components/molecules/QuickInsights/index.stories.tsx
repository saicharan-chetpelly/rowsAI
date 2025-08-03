import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import QuickInsights, { QuickInsightsProps } from '.';

export default {
  title: 'molecules/QuickInsights',
  component: QuickInsights,
} as Meta;

const Template: StoryFn<QuickInsightsProps> = (args) => (
  <QuickInsights {...args} />
);

export const Default = Template.bind({});
Default.args = {
  quickInsightsData: {
    1: 'The total number of clicks is 18,555.',
    2: 'The average click-through rate (CTR) is 10.00%.',
    3: 'The maximum cost per click (CPC) is $0.6.',
    4: 'The minimum spend is $108.',
  },
};
