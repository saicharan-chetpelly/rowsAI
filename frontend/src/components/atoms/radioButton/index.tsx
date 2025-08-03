import React, { ReactNode } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import styled from '@emotion/styled';
import theme from '../../../theme';

export interface RadioButtonsProps {
  value?: string;
  label: ReactNode;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledRadio = styled(Radio)(({ checked }) => ({
  size: 'medium',
  color: checked
    ? theme.palette.textCustom.TEXT_HIGH_EMPHASIS
    : theme.palette.greyCustom[200],
  '&.Mui-checked': {
    color: checked
      ? theme.palette.textCustom.TEXT_HIGH_EMPHASIS
      : theme.palette.greyCustom[200],
  },
}));

export default function RadioButtons({
  value,
  label,
  checked,
  onChange,
}: RadioButtonsProps) {
  return (
    <FormControl>
      <FormControlLabel
        value={value}
        control={<StyledRadio checked={checked} onChange={onChange} />}
        label={label}
      />
    </FormControl>
  );
}

RadioButtons.defaultProps = {
  value: 'Columns',
};
