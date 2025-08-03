import React from 'react';
import Box from '@mui/material/Box';
import { Stack, styled } from '@mui/material';
import { ALT_TEXT } from 'utils/constants';
import DownArrow from '../../../../public/assets/icons/downArrow.svg';
import Icon from '../Icon';

export interface DropdownProps {
  startIconSrc?: string;
  startIconAlt?: string;
  label?: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
}

export const UpsideIcon = styled(Icon)({
  transform: 'rotate(180deg)',
  height: '1.6rem',
  width: '1.6rem',
});

const StyledOutline = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  minHeight: '3.2rem',
  gap: '0.4rem',
});

const StyledInnerStack = styled(Stack)({
  alignItems: 'center',
  gap: '0.8rem',
});
const StyledIcon = styled(Icon)({
  height: '1.6rem',
  width: '1.6rem',
});

const Dropdown = ({
  startIconSrc,
  startIconAlt,
  label,
  handleClick,
  isOpen,
}: DropdownProps) => (
  <StyledOutline onClick={handleClick}>
    <StyledInnerStack direction="row">
      {startIconSrc && (
        <StyledIcon src={startIconSrc} alt={startIconAlt ?? ALT_TEXT} />
      )}
      {label}
    </StyledInnerStack>
    {isOpen ? (
      <UpsideIcon src={DownArrow} alt={ALT_TEXT} />
    ) : (
      <StyledIcon src={DownArrow} alt={ALT_TEXT} />
    )}
  </StyledOutline>
);

Dropdown.defaultProps = {
  startIconSrc: '',
  startIconAlt: '',
  label: '',
  handleClick: () => {},
};

export default Dropdown;
