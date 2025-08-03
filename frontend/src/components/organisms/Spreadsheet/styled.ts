import { Box, Button, buttonClasses, styled, TextField } from '@mui/material';
import theme from 'theme';

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: `${theme.spacing(4)}`,
  width: '50vw',
});

export const StyledTableHeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledIconsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: `${theme.spacing(2)}`,
});
export const StyledSpreadsheetNameWrapper = styled(Box)({
  '&:hover': {
    cursor: 'pointer',
  },
});

export const StyledButton = styled(Button)({
  [`&.${buttonClasses.root}`]: {
    padding: `${theme.spacing(1.25)}`,
    minWidth: 0,
  },
});

export const BoldInputTextField = styled(TextField)({
  height: theme.spacing(8),
  '& .MuiInputBase-input': {
    fontWeight: 'bold',
  },
});
