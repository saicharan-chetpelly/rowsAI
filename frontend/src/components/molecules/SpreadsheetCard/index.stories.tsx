import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SpreadsheetCard from '.';

export default {
  title: 'Molecules/SpreadsheetCard',
  component: SpreadsheetCard,
} as Meta;

const Template: StoryFn<typeof SpreadsheetCard> = (args) => (
  <SpreadsheetCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Health Report FY-2023-2024',
  lastModified: '2 hours ago',
  folder: 'My Spreadsheet',
  onClick: action('Spreadsheet card clicked..'),
  onViewModeClick: action('ViewMode button clicked..'),
  editMode: false,
  onEditMode: action('Edit mode triggered'),
};
