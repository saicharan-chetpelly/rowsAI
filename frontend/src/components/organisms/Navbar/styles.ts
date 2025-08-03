import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  accordionClasses,
  accordionDetailsClasses,
  accordionSummaryClasses,
  buttonClasses,
  styled,
  typographyClasses,
} from '@mui/material';
import theme from 'theme';

export const defaultNavItemStyles = {
  minHeight: '3.6rem',
  borderRadius: `${theme.spacing(2)}`,
  paddingTop: `${theme.spacing(0.25)}`,
  paddingRight: `${theme.spacing(2)}`,
  paddingLeft: `${theme.spacing(4)}`,
  '.insert-icon,.more-icon': {
    display: 'none',
  },
  [`& .${typographyClasses.root}`]: {
    color: `${theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}`,
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.greyCustom[100],
    [`& .${typographyClasses.root}`]: {
      color: `${theme.palette.textCustom.TEXT_HIGH_EMPHASIS}`,
    },
    '.insert-icon,.more-icon': {
      display: 'block',
    },
  },
};
export const Container = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  alignSelf: 'stretch',
  width: '22rem',
  height: '100vh',
  backgroundColor: `${theme.palette.structural[50]}`,
});

export const StyledUserProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: `${theme.spacing(6)}`,
  gap: `${theme.spacing(6)}`,
});

export const StyledIconTypographyWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const StyledNavItemsContainer = styled(Box)({
  paddingLeft: `${theme.spacing(2)}`,
  paddingRight: `${theme.spacing(2)}`,
  '.active': {
    backgroundColor: theme.palette.greyCustom[100],
    [`& .${typographyClasses.root}`]: {
      color: `${theme.palette.textCustom.TEXT_HIGH_EMPHASIS}`,
    },
  },
});

export const StyledSpreadhseetUserProfile = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.spacing(10)} ${theme.spacing(6)} ${theme.spacing(0)}`,
  gap: `${theme.spacing(2)}`,
});

export const StyledPageNavItemWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.spacing(10)} ${theme.spacing(2)} ${theme.spacing(0.5)} ${theme.spacing(2)}`,
  '.active': {
    backgroundColor: theme.palette.greyCustom[100],
  },
});

export const StyledPageNavItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...defaultNavItemStyles,
  '.active': {
    backgroundColor: theme.palette.greyCustom[100],
    color: `${theme.palette.textCustom.TEXT_HIGH_EMPHASIS}`,
  },
});

export const StyledNavItemIconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: `${theme.spacing(1.5)}`,
});

export const StyledIconButton = styled(Button)({
  [`&.${buttonClasses.root}`]: {
    padding: 0,
    minWidth: 0,
  },
});

export const StyledSpreadsheetNameWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: `${theme.spacing(2.5)}`,
  '&:hover': {
    cursor: 'pointer',
  },
});

export const StyledAccordion = styled(Accordion)({
  [`&.${accordionClasses.root}`]: {
    boxShadow: 'none',
    backgroundColor: `${theme.palette.structural[50]}`,
    border: 'none',
    '& .Mui-expanded': {
      backgroundColor: theme.palette.greyCustom[100],
      [`& .${typographyClasses.root}`]: {
        color: `${theme.palette.textCustom.TEXT_HIGH_EMPHASIS}`,
      },
    },
  },
  '&::after,&::before': {
    top: 0,
  },
});

export const StyledAccordionSummary = styled(AccordionSummary)({
  flexDirection: 'row-reverse',
  backgroundColor: `${theme.palette.structural[50]}`,

  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    width: `${theme.spacing(4)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },

  [`.${accordionSummaryClasses.content}`]: {
    margin: 0,
  },
  [`&.${accordionSummaryClasses.root}`]: {
    padding: 0,
    gap: `${theme.spacing(2)}`,
    [`& .${typographyClasses.root}`]: {
      color: `${theme.palette.textCustom.TEXT_MEDIUM_EMPHASIS}`,
    },
    ...defaultNavItemStyles,
  },
});
export const StyledAccordionDetails = styled(AccordionDetails)({
  [`&.${accordionDetailsClasses.root}`]: {
    padding: 0,
    backgroundColor: `${theme.palette.structural[50]}`,
  },
});

export const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const StyledPageSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  paddingLeft: `${theme.spacing(10)}`,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 0,
  ':hover': {
    overflow: 'visible',
    zIndex: 1,
  },
});
