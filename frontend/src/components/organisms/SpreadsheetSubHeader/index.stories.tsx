import React from 'react';
import { action } from '@storybook/addon-actions';
import SpreadsheetSubHeader from '.';

export default {
  title: 'organisms/SpreadsheetSubHeader',
  component: SpreadsheetSubHeader,
};

export const Default = () => (
  <SpreadsheetSubHeader
    handleSidebar={action('Sidebar Clicked')}
    handleViewButton={action('View button Clicked')}
    handleDataActions={action('data actions button Clicked')}
    handleMenuItemClick={action('menu item Clicked')}
  />
);
