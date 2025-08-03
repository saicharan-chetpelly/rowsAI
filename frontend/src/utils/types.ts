export type TypographyVarient =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'subtitle1'
  | 'subtitle2'
  | 'overline';

export type TabsElement = {
  label: string;
  element: React.ReactNode;
};
export type Deepdive = {
  iconSrc: string;
  iconAlt: string;
  deepdiveId: string;
  label: string;
  query: string;
  deepdiveName: string;
};
export type DeepdiveMenu = {
  isDivider: boolean;
  label: string;
  labelColor: string;
  iconSrc: string;
  iconAlt: string;
};
export type NavItemType = {
  navItemId: string;
  iconSrc: string;
  iconAlt: string;
  text: string;
  variant: TypographyVarient;
  textColor: string;
  isDivider: boolean;
};

export type PageSectionType = {
  id: string;
  title: string;
};

export type PageNavItemType = {
  navItemId: string;
  textVariant: TypographyVarient;
  text: string;
  textColor?: string;
  pageSectionData: PageSectionType[];
};

export type NavbarVariantType = 'default' | 'page';
export type Matrix<T> = Array<Array<T | undefined>>;

export interface IDeepDiveItem {
  startIconSrc: string;
  startIconAlt: string;
  label: string;
  deepdiveId: string;
  query: string;
  deepdiveName: string;
}
export type ToolbarArrow = {
  iconSrc: string;
  iconAlt: string;
  arrowId: string;
};
export type TableStylesData = {
  startIconSrc: string;
  startIconAlt: string;
  styleId: string;
  title: string;
};

export interface ISpreadSheetInfo {
  id: string;
  title: string;
  categoryType: string;
  lastModified: string;
  updatedAt: Date;
}
export interface IPlatform {
  id: string;
  title: string;
  icon: string;
  alt: string;
}

export enum FileType {
  XSLX = '.xlsx',
  CSV = '.csv',
}

export type DataKeysResult = {
  numKeys: number | null;
  alphabet: string[] | null;
  formattedData: object[] | null;
};
export type ChartLabel = {
  name: string;
  color: string;
};
export type SpreadsheetsData = {
  id?: string;
  data: Matrix<{
    value: string;
  }>;
  title: string;
};

export type SpreadsheetModel = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PageModel = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  spreadsheet_id: number;
};

export type QuickInsightModel = {
  id: number;
  label: string;
  data_table_id: number;
};

export type DeepDiveModel = {
  id: number;
  label: string;
  query: string;
  data_table_id: number;
};

export type DataTableModel = {
  id: number;
  table_name: string;
  snowflake_table_name: string;
  createdAt: Date;
  updatedAt: Date;
  page_id: number;
  file_content: object[];
};

export type DataTableType = {
  id: string;
  data: Matrix<{
    value: string;
  }>;
  title: string;
};

export type PageDataTableType = {
  navItemId: string;
  textVariant: TypographyVarient;
  text: string;
  textColor?: string;
  dataTableData: DataTableType[];
};
