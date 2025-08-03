import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

interface ITooltip extends TooltipProps {
  title: TooltipProps['title'];
  children: TooltipProps['children'];
  placement: TooltipProps['placement'];
}

const Tooltip = ({ title, children, placement }: ITooltip) => (
  <MuiTooltip title={title} placement={placement}>
    {children}
  </MuiTooltip>
);

export default Tooltip;
