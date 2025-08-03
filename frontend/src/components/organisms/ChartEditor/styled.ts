import { Box, TextField, styled } from '@mui/material';
import Typography from 'components/atoms/Typography';
import theme from 'theme';

export const Container = styled(Box)({
  height: '90vh',
  overflow: 'hidden',
});

export const StyledChartEditorTitle = styled(Typography)({
  padding: `${theme.spacing(0)} ${theme.spacing(8)} ${theme.spacing(8)}`,
});

export const StyledTabsWrapper = styled(Box)({
  padding: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(6)}`,
});

export const StyledSetupTabWrapper = styled(Box)({
  height: '78vh',
  padding: `${theme.spacing(6)} ${theme.spacing(5)} ${theme.spacing(6)} ${theme.spacing(2)}`,
  overflowY: 'scroll',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '15%',
    background: `${theme.palette.greyCustom[400]}`,
    zIndex: -1,
    top: 0,
    left: 0,
  },
  background: `${theme.palette.structural.WHITE}`,
});

export const StyledChartEditorOptionsWrapper = styled(Box)({
  marginTop: `${theme.spacing(6)}`,
  display: 'flex',
  flexDirection: 'column',
  gap: `${theme.spacing(6)}`,
});

export const StyledTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-input': {
    padding: `${theme.spacing(2.25)} ${theme.spacing(2.75)}`,
    fontFamily: 'Output-Sans-Regular',
    fontSize: '1.6rem',
    border: `1px solid ${theme.palette.greyCustom[100]}`,
    borderRadius: `${theme.spacing(1)}`,
    background: `${theme.palette.greyCustom[500]}`,
  },
  '& .MuiOutlinedInput-root': {
    width: '100%',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.greyCustom[600]}`,
      border: `1px solid ${theme.palette.greyCustom[600]}`,
    },
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.greyCustom[500]}`,
    borderRadius: `${theme.spacing(1)}`,
  },
});

export const StyledColumnFlexWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: `${theme.spacing(0.5)}`,
  width: '100%',
});

export const StyledRowFlexSpaceBtwBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const StyledRadiosWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: `${theme.spacing(1)}`,
});

export const StyledVerticalAxisWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: `${theme.spacing(1)}`,
  width: '90%',
});
