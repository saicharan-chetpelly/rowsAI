import React from 'react';
import DeleteIcon from '@public/assets/icons/delete.svg';
import InsertTableIcon from '@public/assets/icons/insert.svg';
import CopyFormulaIcon from '@public/assets/icons/copyIcon.svg';
import DeepdiveIcon from '@public/assets/icons/deepdive.svg';
import HomeIcon from '@public/assets/icons/home.svg';
import MySpreadsheetIcon from '@public/assets/icons/mySpreadsheet.svg';
import AddFolderIcon from '@public/assets/icons/addFolder.svg';
import SettingsIcon from '@public/assets/icons/settings.svg';
import UpgradeIcon from '@public/assets/icons/upgrade.svg';
import TextStyles from '@public/assets/icons/textStyles.svg';
import Alignment from '@public/assets/icons/alignment.svg';
import TableFormats from '@public/assets/icons/tableFormat.svg';
import BackArrow from '@public/assets/icons/backArrow.svg';
import FrontArrow from '@public/assets/icons/frontArrow.svg';
import RightArrow from '@public/assets/icons/rightArrow.svg';
import Table from '@public/assets/icons/table.svg';
import DataTable from '@public/assets/icons/dataTable.svg';
import PivotTable from '@public/assets/icons/pivotTable.svg';
import Chart from '@public/assets/icons/edit-chart.svg';
import Function from '@public/assets/icons/function.svg';
import Button from '@public/assets/icons/button.svg';
import Inputfield from '@public/assets/icons/inputfield.svg';
import Dropdown from '@public/assets/icons/dropdown.svg';
import Datepicker from '@public/assets/icons/datepicker.svg';
import Checkbox from '@public/assets/icons/checkbox.svg';
import Link from '@public/assets/icons/link.svg';
import OpenAILogo from '@public/assets/icons/OpenAi-Logo.svg';
import GoogleSheetsLogo from '@public/assets/icons/google-sheets-logo.svg';
import CompanyFinderLogo from '@public/assets/icons/Company-Logo.svg';
import NotionLogo from '@public/assets/icons/Notion.svg';
import GoogleAnalyticsLogo from '@public/assets/icons/google-analytics.svg';
import GoogleAdsLogo from '@public/assets/icons/Google-Ads-Logo.svg';
import HTTPLogo from '@public/assets/icons/HTTP-Logo.svg';
import InstagramLogo from '@public/assets/icons/Instagram-Logo.svg';
import FacebookAdsLogo from '@public/assets/icons/facebook-Logo.svg';
import GoogleSearchConsoleLogo from '@public/assets/icons/google-search-console.svg';
import SlackLogo from '@public/assets/icons/Slack_Logo.svg';
import RenameIcon from '@public/assets/icons/rename.svg';
import DuplicateIcon from '@public/assets/icons/duplicate.svg';
import NotesIcon from '@public/assets/icons/notes.svg';
import DashboardIcon from '@public/assets/icons/dashboard.svg';
import EyeIcon from '@public/assets/icons/eye.svg';
import EmbedIcon from '@public/assets/icons/embed.svg';
import SaveIcon from '@public/assets/icons/save.svg';
import PieIcon from '@public/assets/icons/pieIcon.svg';
import ColumnIcon from '@public/assets/icons/columnIcon.svg';
import ComboIcon from '@public/assets/icons/comboIcon.svg';
import BarIcon from '@public/assets/icons/barIcon.svg';
import LineIcon from '@public/assets/icons/lineIcon.svg';
import ScatterIcon from '@public/assets/icons/scatterIcon.svg';

import { Chip, Stack } from '@mui/material';
import { MenuOptionsInterface } from 'components/molecules/ChartSelectMenu';
import DefaultChartEditorOptions from 'components/organisms/ChartEditor/defaultChartEditorOptions';
import Typography from '../components/atoms/Typography';
import Switch from '../components/atoms/Switch';
import { MenuItemProps } from '../components/molecules/MenuItem';
import {
  Deepdive,
  Matrix,
  IDeepDiveItem,
  IPlatform,
  NavItemType,
  PageNavItemType,
  PageSectionType,
  TableStylesData,
  ToolbarArrow,
  ISpreadSheetInfo,
  SpreadsheetsData,
  PageDataTableType,
} from './types';
import theme from '../theme';

export const APP_HEADER_OPTION = ['Integration', 'Template', 'Community'];
export const APP_AUTH_OPTION = ['Sign in', 'Sign up for free'];
export const SIGNUP_OPTION = 'Sign up for free';
export const ALT_TEXT = 'icon';
export const IMPORT_TEXT = 'Import sample data';
export const CREATE_SPREADSHEET_TEXT = 'Create spreadsheet';
export const HOME_TEXT = 'Home';
export const HOME_ALT_TEXT = 'home';
export const OPEN_IN_VIEW_MODE = 'Open in View mode';
export const OPTIONS = 'Options';
export const ICON_TYPO_DATA_TEST_ID = 'icon-label';
export const MENU_VIEW_TEXT = 'Show in View mode';
export const MENU_DELETE_TEXT = 'Delete';
export const MENU_FUNCTION_TEXT = 'Function';
export const DIVIDER_TESTID = 'divider-testid';
export const DEEPDIVE_MENU: MenuItemProps[] = [
  {
    menuItemID: '1',
    iconSrc: InsertTableIcon,
    iconAlt: 'Insert table',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Insert table
      </Typography>
    ),
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '2',
    iconSrc: CopyFormulaIcon,
    iconAlt: 'Copy formula',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Copy formula
      </Typography>
    ),
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '3',
    iconSrc: '',
    iconAlt: 'divider',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        -
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: true,
  },
  {
    menuItemID: '4',
    iconSrc: DeleteIcon,
    iconAlt: 'Delete',
    children: (
      <Typography variant="body1" color={theme.palette.red[200]}>
        Delete
      </Typography>
    ),
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
];

export const DEEP_DIVES: Deepdive[] = [
  {
    iconSrc: DeepdiveIcon,
    iconAlt: 'deepdive icon',
    deepdiveId: '1',
    label: 'Campaign Performance by Date',
  },
  {
    iconSrc: DeepdiveIcon,
    iconAlt: 'deepdive icon',
    deepdiveId: '2',
    label: 'Campaign Performance by Campaign',
  },
  {
    iconSrc: DeepdiveIcon,
    iconAlt: 'deepdive icon',
    deepdiveId: '3',
    label: 'Campaign Performance by Campaign',
  },
  {
    iconSrc: DeepdiveIcon,
    iconAlt: 'deepdive icon',
    deepdiveId: '4',
    label: 'Campaign Spennd by Campaign',
  },
];

export const RENAME_CHART = 'rename-chart';
export const DELETE_CHART = 'delete-chart';
export const CHART_EDIT_MENU: MenuItemProps[] = [
  {
    menuItemID: 'edit-chart',
    iconSrc: Chart,
    iconAlt: 'edit-chart-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Edit chart
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: RENAME_CHART,
    iconSrc: RenameIcon,
    iconAlt: 'rename-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Rename
      </Typography>
    ),
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: 'duplicate-chart',
    iconSrc: DuplicateIcon,
    iconAlt: 'duplicate-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Duplicate
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: 'insert-subtitle',
    iconSrc: NotesIcon,
    iconAlt: 'insert-subtitle-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Insert subtitle
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: 'insert-footnote',
    iconSrc: NotesIcon,
    iconAlt: 'insert-footnote-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Insert footnote
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: 'stack-horizontally',
    iconSrc: DashboardIcon,
    iconAlt: 'stack-horizontally-icon',
    children: (
      <Stack>
        <Stack
          direction="row"
          spacing="1rem"
          alignItems="center"
          justifyContent="space-between">
          <Typography
            variant="body1"
            color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
            Stack horizontally
          </Typography>
          <Chip
            size="small"
            label={
              <Typography
                variant="caption"
                color={theme.palette.primaryCustom.PRIMARY_DARK}>
                New
              </Typography>
            }
          />
          <Switch />
        </Stack>
        <Typography
          variant="caption"
          color={theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}>
          Arrange Charts side-by-side
        </Typography>
      </Stack>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: 'view-mode',
    iconSrc: EyeIcon,
    iconAlt: 'eye-icon',
    children: (
      <Stack
        direction="row"
        alignItems="center"
        spacing="4rem"
        justifyContent="space-between">
        <Typography
          variant="body1"
          color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
          Show in View Mode
        </Typography>
        <Switch defaultChecked />
      </Stack>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: 'embed-chart',
    iconSrc: EmbedIcon,
    iconAlt: 'embed-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Embed
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: 'copy-to-clipboard',
    iconSrc: CopyFormulaIcon,
    iconAlt: 'copy-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Copy to clipboard
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: true,
  },
  {
    menuItemID: 'save-as-png',
    iconSrc: SaveIcon,
    iconAlt: 'save-as-png-icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Save as PNG
      </Typography>
    ),
    isToggle: false,
    isDisabled: true,
    isDivider: false,
  },
  {
    menuItemID: DELETE_CHART,
    iconSrc: DeleteIcon,
    iconAlt: 'delete-icon',
    children: (
      <Typography variant="body1" color={theme.palette.red[200]}>
        Delete
      </Typography>
    ),
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
];

export const CLICKED = 'clicked';
export const DEEPDIVE_TESTID = 'deepdive-card';
export const MENU_ITEM_TESTID = 'menuitem-testid';
export const IMPORT_FILE_TEXT = 'Import file';
export const BROWSE_TEXT = 'Browse templates';
export const ADD_ALT_TEXT = 'Add square icon';
export const BROWSE_ALT_TEXT = 'Browse icon';
export const IMPORT_ALT_TEXT = 'Import file icon';
export const CREATE_BUTTON_TESTID = 'create-button-testid';
export const IMPORT_BUTTON_TESTID = 'import-button-testid';
export const BROWSE_BUTTON_TESTID = 'browse-button-testid';
export const QUICK_INSIGTHS_TEXT = 'Quick insights';
export const MENU_ALT_TEXT = 'Quick insights';
export const MY_SPREADSHEET_ALT_TEXT = 'my-spreadsheet-icon';
export const MY_SPREADSHEETS_TEXT = 'My Spreadsheets';
export const ADD_FOLDER_ALT_TEXT = 'my-spreadsheet-icon';
export const ADD_FOLDER_TEXT = 'Add Folder';
export const SETTINGS_ALT_TEXT = 'settings-icon';
export const SETTINGS_TEXT = 'Settings';
export const UPGRADE_ALT_TEXT = 'upgrade-icon';
export const UPGRADE_TEXT = 'Upgrade';
export const SIDEARROW_ALT_TEXT = 'side-arrow-icon';
export const DEFAULT_NAV_DATA: NavItemType[] = [
  {
    navItemId: '1',
    iconSrc: HomeIcon,
    iconAlt: HOME_ALT_TEXT,
    text: HOME_TEXT,
    variant: 'body1',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    isDivider: false,
  },
  {
    navItemId: '2',
    iconSrc: '',
    iconAlt: 'divider',
    text: 'DIVIDER',
    variant: 'body1',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    isDivider: true,
  },
  {
    navItemId: '3',
    iconSrc: MySpreadsheetIcon,
    iconAlt: MY_SPREADSHEET_ALT_TEXT,
    text: MY_SPREADSHEETS_TEXT,
    variant: 'body1',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    isDivider: false,
  },
  {
    navItemId: '4',
    iconSrc: AddFolderIcon,
    iconAlt: ADD_FOLDER_ALT_TEXT,
    text: ADD_FOLDER_TEXT,
    variant: 'body1',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    isDivider: false,
  },
];
export const DEFAULT_NAV_FOOTER_DATA: NavItemType[] = [
  {
    navItemId: '1',
    iconSrc: SettingsIcon,
    iconAlt: SETTINGS_ALT_TEXT,
    text: SETTINGS_TEXT,
    variant: 'body1',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    isDivider: false,
  },
  {
    navItemId: '2',
    iconSrc: '',
    iconAlt: 'divider',
    text: 'DIVIDER',
    variant: 'body1',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    isDivider: true,
  },
  {
    navItemId: '3',
    iconSrc: UpgradeIcon,
    iconAlt: UPGRADE_ALT_TEXT,
    text: UPGRADE_TEXT,
    variant: 'body1',
    textColor: theme.palette.textCustom.TEXT_HIGH_EMPHASIS,
    isDivider: false,
  },
];
export const PAGE_NAV_ITEM_DATA: PageDataTableType[] = [
  {
    navItemId: '1',
    textVariant: 'body1',
    text: 'Page 1',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    dataTableData: [
      {
        id: '1',
        title: 'Table 1',
        data: [],
      },
      {
        id: '2',
        title: 'Table 2',
        data: [],
      },
    ],
  },
  {
    navItemId: '2',
    textVariant: 'body1',
    text: 'Page 2',
    textColor: theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS,
    dataTableData: [
      {
        id: '1',
        title: 'Chart11',
        data: [],
      },
      {
        id: '2',
        title: 'Chart22',
        data: [],
      },
    ],
  },
];

export const DEFAULT_USERNAME_AND_SPREADSHEETS_TEXT =
  'aquaman-889cda4b / My Spreadsheets';
export const UNTITILED_1 = 'Untitled 1';
export const ADD_PAGE_ELEMENT_TOOLTIP_LABEL = 'Add Page element';
export const OPTIONS_TOOLTIP_LABEL = 'Options';
export const INSERT_ICON_ALT_TEXT = 'Insert Icon';
export const MORE_ICON_ALT_TEXT = 'More Icon';
export const ADD_PAGE = 'Add page';
export const DOWN_ARROW_ICON_ALT_TEXT = 'down-arrow-icon';
export const SIDE_ARROW_ICON_ALT_TEXT = 'side-arrow-icon';
export const AVATAR_DEFAULT_LABEL = 'A';
export const DEFAULT_USER_NAME = 'aquaman-889cda4';
export const UP_ARROW_DOWN_ARROW_ALT_TEXT = 'up-down-arrow-icon';
export const SPREADSHEET_USER_PROFILE = 'Spreadsheet_user_profile';
export const SPREADSHEET_TITLE_PLACEHOLDER = 'Spreadsheet_title';
export const DEFAULT_NAVBAR_TESTID = 'default-navbar';
export const PAGE_NAVBAR_TESTID = 'PAGE-navbar';
export const TICK_ALT_TEXT = 'tick-icon';
export const CHART_ALT_TEXT = 'chart-icon';
export const SPREADSHEET_DUMMY_DATA: Matrix<{
  value: string;
}> = [
  [
    { value: 'Date' },
    { value: 'Clicks' },
    { value: 'Spend' },
    { value: 'Column4' },
    { value: 'Column5' },
    { value: 'Column6' },
    { value: 'Column7' },
    { value: 'Column8' },
  ],
  [
    { value: '2023-01-04' },
    { value: '260' },
    { value: '$130.00' },
    { value: 'Value4' },
    { value: 'Value5' },
    { value: 'Value6' },
    { value: 'Value7' },
    { value: 'Value8' },
  ],
  [
    { value: '2023-01-05' },
    { value: '280' },
    { value: '$140.00' },
    { value: 'Value4' },
    { value: 'Value5' },
    { value: 'Value6' },
    { value: 'Value7' },
    { value: 'Value8' },
  ],
  [
    { value: '2023-01-06' },
    { value: '300' },
    { value: '$150.00' },
    { value: 'Value4' },
    { value: 'Value5' },
    { value: 'Value6' },
    { value: 'Value7' },
    { value: 'Value8' },
  ],
  [
    { value: '2023-01-07' },
    { value: '320' },
    { value: '$160.00' },
    { value: 'Value4' },
    { value: 'Value5' },
    { value: 'Value6' },
    { value: 'Value7' },
    { value: 'Value8' },
  ],
  [
    { value: '2023-01-08' },
    { value: '340' },
    { value: '$170.00' },
    { value: 'Value4' },
    { value: 'Value5' },
    { value: 'Value6' },
    { value: 'Value7' },
    { value: 'Value8' },
  ],
  [
    { value: '2023-01-09' },
    { value: '360' },
    { value: '$180.00' },
    { value: 'Value4' },
    { value: 'Value5' },
    { value: 'Value6' },
    { value: 'Value7' },
    { value: 'Value8' },
  ],
  [
    { value: '2023-01-10' },
    { value: '380' },
    { value: '$190.00' },
    { value: 'Value4' },
    { value: 'Value5' },
    { value: 'Value6' },
    { value: 'Value7' },
    { value: 'Value8' },
  ],
];
export const SPREADSHEET_EMPTY_DATA: SpreadsheetsData = {
  data: [
    [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  ],
  title: 'Table',
  id: '0',
};

export const DYNAMIC_STYLES_TEXT = 'dynamicStyles';
export const SPREADSHEET_TITLE_WRAPPER = 'spreadsheet-title-wrap';
export const AI_ANALYST_TOOLTIP_TITLE = 'AI analyst';
export const FILTER_OPTIONS_TOOLTIP_TITLE = 'Filter options';
export const SORT_OPTIONS_TOOLTIP_TITLE = 'Sort options';
export const SEARCH_OPTIONS_TOOLTIP_TITLE = 'Find and replace';
export const AI_ANALYST_ICON_ALT_TITLE = 'AI analyst icon';
export const FILTER_OPTIONS_ICON_ALT_TITLE = 'Filter options icon';
export const SORT_OPTIONS_ICON_ALT_TITLE = 'Sort options icon';
export const SEARCH_OPTIONS_ICON_ALT_TITLE = 'Find and replace icon';
export const ANALYST_TITLE = 'AI Analyst';
export const ANALYST_TABLE_EMPTY_WARNING =
  'Oops, looks like your table is empty';
export const ANALYST_FILL_DATA = 'Fill it with data to get things moving!';
export const NOT_SURE_TO_START = 'Not sure where to start?';
export const IMPORT_SAMPLE_DATA = 'Import sample data';
export const ANALYST_TEXTFIELD_PLACEHOLER_TEXT =
  'Ask AI a question about your data...';

export const DEEP_DIVE_ICON_ALT = 'deep-dive-icon';
export const SAMPLE_QUICK_INSIGHTS: Record<number, string> = {
  1: 'The total number of clicks is 18,555.',
  2: 'The average click-through rate (CTR) is 10.00%.',
  3: 'The maximum cost per click (CPC) is $0.6.',
  4: 'The minimum spend is $108.',
};

export const SAMPLE_DEEP_DIVE: IDeepDiveItem[] = [
  {
    deepdiveId: '1',
    label: 'Compaign Performance by Date',
    startIconSrc: DeepdiveIcon,
    startIconAlt: DEEP_DIVE_ICON_ALT,
  },
  {
    deepdiveId: '2',
    label: 'Compaign Performance by Compaign',
    startIconSrc: DeepdiveIcon,
    startIconAlt: DEEP_DIVE_ICON_ALT,
  },
  {
    deepdiveId: '3',
    label: 'Compaign Performance by Group',
    startIconSrc: DeepdiveIcon,
    startIconAlt: DEEP_DIVE_ICON_ALT,
  },

  {
    deepdiveId: '4',
    label: 'Compaign Performance by Team',
    startIconSrc: DeepdiveIcon,
    startIconAlt: DEEP_DIVE_ICON_ALT,
  },
];

export const DEEP_DIVES_TITLE = 'Deep dives';
export const AI_ANALYST_BETA_MODE_INFO =
  'The AI Analyst is currently in beta. Share your ';
export const DRAWER_SAMPLE_CONTENT = 'Drawer Content';
export const DUPLICATE_TEXT = 'Duplicate';
export const SHARE_TEXT = 'Share';
export const VIEW_TEXT = 'View';
export const DATA_ACTIONS_TEXT = 'Data Actions';
export const INSERT_TEXT = 'Insert';
export const MORE_FORMATS_TEXT = 'More formats';
export const MORE_FORMATS_ALT_TEXT = 'Moreformats icon';
export const SEARCH_PLACEHOLDER_TEXT = 'Search';
export const BACK_TO_DASHBOARD = 'Back to dashboard';

export const TOOLBAR_ARROWS: ToolbarArrow[] = [
  {
    iconSrc: BackArrow,
    iconAlt: 'backarrow icon',
    arrowId: '1',
  },
  {
    iconSrc: FrontArrow,
    iconAlt: 'frontarrow icon',
    arrowId: '2',
  },
];
export const TABLE_STYLES_DATA: TableStylesData[] = [
  {
    startIconSrc: TextStyles,
    startIconAlt: 'textstyles icon',
    styleId: '1',
    title: 'Text styles',
  },
  {
    startIconSrc: Alignment,
    startIconAlt: 'alignment icon',
    styleId: '2',
    title: 'Alignment',
  },
  {
    startIconSrc: TableFormats,
    startIconAlt: 'tableformats icon',
    styleId: '3',
    title: 'Table format',
  },
];
export const INSERT_MENU: MenuItemProps[] = [
  {
    menuItemID: '1',
    iconSrc: Table,
    iconAlt: 'table icon',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Table
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: 'End Icon 1',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '2',
    iconSrc: DataTable,
    iconAlt: 'data table',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Data Table
      </Typography>
    ),
    endIconSrc: RightArrow,
    endIconAlt: 'rightarrow-icon',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '3',
    iconSrc: PivotTable,
    iconAlt: 'pivot table',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Pivot Table
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '4',
    iconSrc: Chart,
    iconAlt: 'chart',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Chart
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '5',
    iconSrc: '',
    iconAlt: 'divider',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        -
      </Typography>
    ),
    endIconSrc: undefined,
    endIconAlt: undefined,
    isToggle: false,
    isDisabled: true,
    isDivider: true,
  },
  {
    menuItemID: '6',
    iconSrc: Function,
    iconAlt: 'function',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Function
      </Typography>
    ),
    endIconSrc: RightArrow,
    endIconAlt: 'rightarrow-icon',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '7',
    iconSrc: '',
    iconAlt: 'divider',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        -
      </Typography>
    ),
    endIconSrc: undefined,
    endIconAlt: undefined,
    isToggle: false,
    isDisabled: true,
    isDivider: true,
  },
  {
    menuItemID: '8',
    iconSrc: Button,
    iconAlt: 'button',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Button
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '9',
    iconSrc: Inputfield,
    iconAlt: 'inputfield',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Input field
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '10',
    iconSrc: Dropdown,
    iconAlt: 'dropdown',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Dropdown list
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '11',
    iconSrc: Datepicker,
    iconAlt: 'date picker',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Date picker
      </Typography>
    ),
    endIconSrc: RightArrow,
    endIconAlt: 'rightarrow-icon',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '12',
    iconSrc: Checkbox,
    iconAlt: 'checkbox',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Checkbox
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '13',
    iconSrc: Link,
    iconAlt: 'link',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Link
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
  {
    menuItemID: '14',
    iconSrc: '',
    iconAlt: 'divider',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        -
      </Typography>
    ),
    endIconSrc: undefined,
    endIconAlt: undefined,
    isToggle: false,
    isDisabled: true,
    isDivider: true,
  },
  {
    menuItemID: '15',
    iconSrc: '',
    iconAlt: '',
    children: (
      <Typography
        variant="body1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Clear action element
      </Typography>
    ),
    endIconSrc: '',
    endIconAlt: '',
    isToggle: false,
    isDisabled: false,
    isDivider: false,
  },
];

export const SAMPLE_SPREADSHEETS_INFO: ISpreadSheetInfo[] = [
  {
    id: '1',
    title: 'Health Report FY:23-24',
    categoryType: 'Health',
    lastModified: '33 minutes ago',
  },
  {
    id: '2',
    title: 'Finance Report Q4:23',
    categoryType: 'Finance',
    lastModified: '1 hour ago',
  },
  {
    id: '3',
    title: 'Sales Report December:23',
    categoryType: 'Sales',
    lastModified: '2 hours ago',
  },
  {
    id: '4',
    title: 'Employee Performance Report 2023',
    categoryType: 'HR',
    lastModified: '3 hours ago',
  },
  {
    id: '5',
    title: 'Inventory Management Report 2023',
    categoryType: 'Operations',
    lastModified: '4 hours ago',
  },
];

export const RENAME_SPREADSHEET_PLACEHOLDER = 'Rename sheet';
export const RECENT_ACTIVITY_TEXT = 'Recent Activity';
export const DATA_ACTIONS_TITLE = 'Data Actions';
export const IMPORT_CSV_XLSX_FILE = 'Import CSV / XLSX';
export const SEARCH_ACTIONS_PLACEHOLDER = 'Search for an action or integration';
export const IMPORT_FILE_BUTTON_TESTID = 'import-file-button';
export const IMPORT_DATA = 'Import data';
export const SEND_DATA = 'Send data';
export const SEE_ALL_TEXT = 'See all';
export const IMPORT_FILE_SUPPORT =
  '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv, text/csv';
export const CSV_ERROR_READ = 'Error reading CSV file:';
export const XSLX_ERROR_READ = 'Error reading XSLX file:';
export const DATA_ACTION_IMPORT_INPUT_TESTID = 'import-file-input';

export const IMPORT_PLATEFORM_DATA_OPTION: IPlatform[] = [
  {
    id: 'openai',
    title: 'OpenAI',
    icon: OpenAILogo,
    alt: 'open-ai-icon',
  },
  {
    id: 'google-sheets',
    title: 'Google Sheets',
    icon: GoogleSheetsLogo,
    alt: 'google-sheets-icon',
  },
  {
    id: 'company-finder',
    title: 'Company Finder',
    icon: CompanyFinderLogo,
    alt: 'company-finder-icon',
  },
  {
    id: 'notion',
    title: 'Notion',
    icon: NotionLogo,
    alt: 'notion-icon',
  },
  {
    id: 'google-analytics',
    title: 'Google Analytics',
    icon: GoogleAnalyticsLogo,
    alt: 'google-analytics-icon',
  },
  {
    id: 'google-ads',
    title: 'Google Ads',
    icon: GoogleAdsLogo,
    alt: 'google-ads-icon',
  },
  {
    id: 'http',
    title: 'HTPP',
    icon: HTTPLogo,
    alt: 'http-icon',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    icon: InstagramLogo,
    alt: 'instagram-icon',
  },
  {
    id: 'facebook-ads',
    title: 'Facebook Ads',
    icon: FacebookAdsLogo,
    alt: 'facebook-ads-icon',
  },
  {
    id: 'google-search-console',
    title: 'Google Search Console',
    icon: GoogleSearchConsoleLogo,
    alt: 'google-search-console-icon',
  },
];

export const SEND_DATA_TO_PLATFORM_OPTION: IPlatform[] = [
  {
    id: 'google-sheets',
    title: 'Google Sheets',
    icon: GoogleSheetsLogo,
    alt: 'google-sheets-icon',
  },
  {
    id: 'notion',
    title: 'Notion',
    icon: NotionLogo,
    alt: 'notion-icon',
  },
  {
    id: 'http',
    title: 'HTPP',
    icon: HTTPLogo,
    alt: 'http-icon',
  },
  {
    id: 'slack',
    title: 'Slack',
    icon: SlackLogo,
    alt: 'slack-icon',
  },
];

export const STYLED_DEFAULT_TABS_DATA = [
  { label: 'Setup', element: <div>Element One</div> },
  { label: 'More options', element: <div>Element Two</div> },
];

export const CHART_SELECT_MENU_OPTIONS_DATA: MenuOptionsInterface[] = [
  { value: 'Line', label: 'Line Chart', icon: LineIcon },
  { value: 'Column', label: 'Column', icon: ColumnIcon },
  { value: 'Combo', label: 'Combo', icon: ComboIcon },
  { value: 'Bar', label: 'Bar Chart', icon: BarIcon },
  { value: 'Stacked Column', label: 'Stacked Column', icon: ColumnIcon },
  { value: 'Stacked Bar', label: 'Stacked Bar', icon: BarIcon },
  { value: 'Scatter', label: 'Scatter', icon: ScatterIcon },
  { value: 'Pie', label: 'Pie Chart', icon: PieIcon },
];

export const MAIN_AXIS_MENU_OPTIONS_DATA: MenuOptionsInterface[] = [
  { value: `'Doubts'!A4:A7`, label: `'Doubts'!A4:A7` },
  { value: `'Doubts'!B4:B7`, label: `'Doubts'!B4:B7` },
  { value: 'Status', label: 'Status' },
  {
    value: 'status type',
    label: 'Which status to display?Report status or court search status',
  },
];

export const VERTICAL_AXIS_MENU_OPTIONS_DATA1: MenuOptionsInterface[] = [
  { value: `'Doubts'!B4:B7`, label: `'Doubts'!B4:B7` },
  { value: `'Doubts'!A4:A7`, label: `'Doubts'!A4:A7` },
  { value: 'Status', label: 'Status' },
  {
    value: 'status type',
    label: 'Which status to display?Report status or court search status',
  },
];

export const VERTICAL_AXIS_MENU_OPTIONS_DATA2: MenuOptionsInterface[] = [
  { value: 'Status', label: 'Status' },
  { value: `'Doubts'!B4:B7`, label: `'Doubts'!B4:B7` },
  { value: `'Doubts'!A4:A7`, label: `'Doubts'!A4:A7` },
  {
    value: 'status type',
    label: 'Which status to display?Report status or court search status',
  },
];

export const VERTICAL_AXIS_MENU_OPTIONS_DATA3: MenuOptionsInterface[] = [
  {
    value: 'status type',
    label: 'Which status to display?Report status or court search status',
  },
  { value: `'Doubts'!B4:B7`, label: `'Doubts'!B4:B7` },
  { value: 'Status', label: 'Status' },
  { value: `'Doubts'!A4:A7`, label: `'Doubts'!A4:A7` },
];

export const STYLED_DEFAULT_TABS = [
  {
    label: 'Setup',
    element: <DefaultChartEditorOptions />,
  },
  { label: 'More options', element: <div>Element Two</div> },
];

export const CHART_TYPE = 'Chart type';
export const DATA_RANGE = 'Data range';
export const USE_FIRST_ROW_AS_HEADERS_MESSAGE = 'Use first row as headers';
export const USE_FIRST_COLUMN_AS_LABELS_MESSAGE = 'Use first column as labels';
export const TREAT_LABELS_AS_TEXT = 'Treat labels as text';
export const GROUP_DATA_BY = 'Group data by';
export const MAIN_AXIS = 'Main axis';
export const VERTICAL_LEFT_AXIS = 'Vertical left axis';
export const ADD_SERIES = 'Add series';
export const SELECT_DATA_RANGE_PLACEHOLDER_TEXT = 'Select a data range';
export const RADIO_LABELS = ['Columns', 'Rows'];
export const CHART_EDITOR = 'Chart Editor';
export const DEFAULT_DATA_RANGE_VALUE = `'Doubts'!A4:D7`;
export const HIDE_ALT_TEXT = 'hide icon';
export const ALPHABETS_MAPPING_DATAKEY_SET = 'abcdefghijklmnopqrstuvwxyz';
export const EDIT_CHART_TOOLTIP_TEXT = 'Edit chart';
export const ANALYST_REFRESH_ICON_ALT_TEXT = 'refresh-icon';
export const SHEET_RENAME_PLACEHOLDER = 'Rename';
export const PAGE_TITLE = 'Page1';
export const TABLE_TITLE = 'Table 1';
export const HIDE_SIDEBAR_ICON_ALT_TEXT = 'hide-sidebar-icon';
export const SIDEBAR_TOGGLE_TOOLTIP_TEXT = 'Hide sidebar Ctrl\\';
export const EDIT_TEXT = 'Edit';
export const CHART_TITLE = 'Chart1';
export const ANALYST_LOADER_TEXT = `The Deep dives extract trends, and create summary tables with the most
relevent KPIs`;
