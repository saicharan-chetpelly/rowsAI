import React from 'react';
import {
  DEFAULT_NAV_DATA,
  DEFAULT_NAV_FOOTER_DATA,
  PAGE_NAV_ITEM_DATA,
} from 'utils/constants';
import {
  NavItemType,
  NavbarVariantType,
  PageDataTableType,
} from 'utils/types';
import DefaultNavbar from './defaultNavbar';
import PageNavbar from './pageNavbar';
import { Matrix } from 'react-spreadsheet';

export interface NavbarProps {
  variant: NavbarVariantType;
  activePage: string;
  navData?: NavItemType[];
  navFooterData?: NavItemType[];
  pageNavItemData?: PageDataTableType[];
  setDataState: React.Dispatch<
    React.SetStateAction<
      Matrix<{
        value: string;
      }>
    >
  >;
}

const Navbar = ({
  variant,
  activePage,
  navData,
  navFooterData,
  pageNavItemData,
  setDataState,
}: NavbarProps) => {
  if (variant === 'default') {
    return (
      <DefaultNavbar
        activePageTitle={activePage}
        navData={navData}
        footerNavData={navFooterData}
      />
    );
  }
  return (
    <PageNavbar
      activePage={activePage}
      pageNavItemData={pageNavItemData}
      setDataState={setDataState}
    />
  );
};
Navbar.defaultProps = {
  navData: DEFAULT_NAV_DATA,
  navFooterData: DEFAULT_NAV_FOOTER_DATA,
  pageNavItemData: PAGE_NAV_ITEM_DATA,
};
export default Navbar;
