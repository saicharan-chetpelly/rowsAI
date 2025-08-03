import React from 'react';
import Typography from 'components/atoms/Typography';
import { Box, styled } from '@mui/material';
import theme from 'theme';

export interface RowColInfoProps {
  rowColInfoText: string;
  rowColInfoData: string;
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '2.4rem',
  padding: '0 1.2rem 0 2.4rem',
});

export const VerticalDivider = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: '1.2rem',
  width: '0.1rem',
  background: theme.palette.stroke[100],
});

const RowColInfo = ({ rowColInfoText, rowColInfoData }: RowColInfoProps) => (
  <StyledBox>
    <Typography
      variant="body2"
      color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
      {rowColInfoText}
    </Typography>
    <VerticalDivider />
    <Typography
      variant="body2"
      color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
      {rowColInfoData}
    </Typography>
  </StyledBox>
);

export default RowColInfo;
