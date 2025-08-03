import React from 'react';
import { Box } from '@mui/material';
import { TabsElement } from 'utils/types';
import { v4 as uuidv4 } from 'uuid';
import { Container, CustomTabPanel, StyleTab, StyleTabs } from './styled';

interface TabProps {
  items: TabsElement[];
  value: number;
  handleChange: (_event: React.SyntheticEvent, newValue: number) => void;
}
const Tabs = ({ items, value, handleChange }: TabProps) => (
  <Container>
    <Box>
      <StyleTabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example">
        {items.map(({ label }) => (
          <StyleTab label={label} key={uuidv4()} />
        ))}
      </StyleTabs>
    </Box>
    {items.map(({ element }, index) => (
      <CustomTabPanel value={value} index={index} key={uuidv4()}>
        {element}
      </CustomTabPanel>
    ))}
  </Container>
);

export default Tabs;
