import { TextField, styled } from '@mui/material';
import theme from '../../../theme';

export interface StyledTextFieldProps {
  height?: string | number;
  scheme?: 'dark' | 'light';
}

const StyledTextField = styled(TextField)((props: StyledTextFieldProps) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px',
    borderColor:
      props.scheme === 'light'
        ? theme.palette.structural[100]
        : theme.palette.textCustom.TEXT_DARK,
    color:
      props.scheme === 'light'
        ? theme.palette.structural[100]
        : theme.palette.textCustom.TEXT_DARK,
  },
  '& .MuiInputBase-input': {
    alignItems: 'center',
    borderColor:
      props.scheme === 'light'
        ? theme.palette.structural[100]
        : theme.palette.textCustom.TEXT_DARK,
    fontFamily: 'Output-Sans-Regular',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    gap: '8px',
    alignItems: 'center',
    '&.Mui-focused fieldset': {
      border: `1px solid ${
        props.scheme === 'light'
          ? theme.palette.structural[100]
          : theme.palette.textCustom.TEXT_DARK
      }`,
    },
    height: props.height,
    '& .MuiInputBase-root-MuiInput-root::after': {
      borderBottom: 'none',
    },
    '& .MuiStack-root': {
      marginRight: '2px',
    },
  },
}));

export default StyledTextField;
