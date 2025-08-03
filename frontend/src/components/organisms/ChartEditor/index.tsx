import React, { useCallback, useState } from 'react';
import Tabs from 'components/molecules/Tabs';

import { CHART_EDITOR, STYLED_DEFAULT_TABS } from 'utils/constants';

import Drawer from 'components/molecules/Drawer';
import { Container, StyledChartEditorTitle, StyledTabsWrapper } from './styled';

interface ChartEditorProps {
  open: boolean;
  toggleChartEditor: () => void;
}
const ChartEditor = ({ open, toggleChartEditor }: ChartEditorProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(open);
  const handeClose = useCallback(() => {
    toggleChartEditor();
    setOpenDrawer(false);
  }, [toggleChartEditor]);
  return (
    <Drawer open={openDrawer} position="right" onClose={handeClose}>
      <Container>
        <StyledChartEditorTitle variant="h5">
          {CHART_EDITOR}
        </StyledChartEditorTitle>
        <StyledTabsWrapper>
          <Tabs items={STYLED_DEFAULT_TABS} value={0} handleChange={() => {}} />
        </StyledTabsWrapper>
      </Container>
    </Drawer>
  );
};

export default ChartEditor;
