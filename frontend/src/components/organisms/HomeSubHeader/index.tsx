import { Box } from '@mui/material';
import Typography from 'components/atoms/Typography';
import IconTypography from 'components/molecules/IconTypography';
import React from 'react';
import theme from 'theme';
import {
  ADD_ALT_TEXT,
  BROWSE_ALT_TEXT,
  BROWSE_BUTTON_TESTID,
  BROWSE_TEXT,
  CREATE_BUTTON_TESTID,
  CREATE_SPREADSHEET_TEXT,
  HOME_TEXT,
  IMPORT_ALT_TEXT,
  IMPORT_BUTTON_TESTID,
  IMPORT_FILE_TEXT,
} from '../../../utils/constants';
import InviteMember from '../../../../public/assets/icons/inviteMember.svg';
import AddSquare from '../../../../public/assets/icons/addSquare.svg';
import ImportFile from '../../../../public/assets/icons/import-file.svg';
import Browse from '../../../../public/assets/icons/browse.svg';
import {
  StyledButton,
  StyledButtonsBox,
  StyledHeaderBox,
  StyledMockButton,
} from './styled';

export interface HomeSubHeaderProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

const HomeSubHeader = ({ handleClick }: HomeSubHeaderProps) => (
  <Box>
    <StyledHeaderBox>
      <Typography
        variant="h5"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        {HOME_TEXT}
      </Typography>
      <IconTypography
        iconSrc={InviteMember}
        iconAltText="invite-members"
        textText="Invite team members"
        textVariant="body2"
        textColor={theme.palette.greyCustom[200]}
        gap="0.8rem"
      />
    </StyledHeaderBox>
    <StyledButtonsBox>
      <StyledButton onClick={handleClick} data-testid={CREATE_BUTTON_TESTID}>
        <IconTypography
          iconSrc={AddSquare}
          iconAltText={ADD_ALT_TEXT}
          textText={CREATE_SPREADSHEET_TEXT}
          textVariant="body2"
          textColor={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}
          gap="0.8rem"
        />
      </StyledButton>
      <StyledMockButton data-testid={IMPORT_BUTTON_TESTID}>
        <IconTypography
          iconSrc={ImportFile}
          iconAltText={IMPORT_ALT_TEXT}
          textText={IMPORT_FILE_TEXT}
          textVariant="body2"
          textColor={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}
          gap="0.8rem"
        />
      </StyledMockButton>
      <StyledMockButton data-testid={BROWSE_BUTTON_TESTID}>
        <IconTypography
          iconSrc={Browse}
          iconAltText={BROWSE_ALT_TEXT}
          textText={BROWSE_TEXT}
          textVariant="body2"
          textColor={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}
          gap="0.8rem"
        />
      </StyledMockButton>
    </StyledButtonsBox>
  </Box>
);

export default HomeSubHeader;
