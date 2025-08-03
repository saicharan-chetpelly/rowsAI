import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AIAnalyst from '.';

export default {
  title: 'Organisms/AIAnalyst',
  component: AIAnalyst,
} as Meta;

const Template: StoryFn<typeof AIAnalyst> = (args) => <AIAnalyst {...args} />;

export const AIAnalystWithData = Template.bind({});

AIAnalystWithData.args = {
  open: true,
  sheetTitle: 'Table 1',
  analyzableData: ['data'],
  onClickImportData: action('Import data button clicked..'),
  onClickDeepDiveOption: action('Deep dive option click with the info: '),
  toggleAIAnalyst: action('AI analyst toggle'),
};

export const AIAnalystWithoutData = Template.bind({});
AIAnalystWithoutData.args = {
  open: true,
  sheetTitle: 'Table 1',
  analyzableData: [],
  onClickImportData: action('Import data button clicked..'),
  onClickDeepDiveOption: action('Deep dive option click with the info: '),
  toggleAIAnalyst: action('AI analyst toggle'),
};
