import React from 'react';
import { render } from '@testing-library/react';
import QuickInsights from '.';

const quickInsightsData = {
  1: 'The total number of clicks is 18,555.',
  2: 'The average click-through rate (CTR) is 10.00%.',
  3: 'The maximum cost per click (CPC) is $0.6.',
  4: 'The minimum spend is $108.',
};

describe('QuickInsights component', () => {
  test('should calls handleClick when an insight is clicked', () => {
    render(<QuickInsights quickInsightsData={quickInsightsData} />);
  });
});
