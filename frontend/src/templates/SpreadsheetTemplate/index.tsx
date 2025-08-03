import React from 'react';
import { Box, Stack, styled } from '@mui/material';

interface SpreadsheetTemplateProps {
  header: React.ReactNode;
  sideNav: React.ReactNode;
  bodyContent: React.ReactNode;
}

const StyledMainContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

const ContentBox = styled(Box)({
  width: '100%',
});

const SpreadsheetTemplate = ({
  sideNav,
  bodyContent,
  header,
}: SpreadsheetTemplateProps) => (
  <Stack
    direction="column"
    data-testid="spreadsheet-template"
    sx={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    }}>
    {header}
    <StyledMainContainer>
      <Box data-testid="sidebar">{sideNav}</Box>
      <ContentBox data-testid="content-box">{bodyContent}</ContentBox>
    </StyledMainContainer>
  </Stack>
);

export default SpreadsheetTemplate;
