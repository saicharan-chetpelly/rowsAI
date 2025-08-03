import React from 'react';
import { AvatarProps as MuiAvatarProps } from '@mui/material';
import StyledAvatar from './styled';

interface IAvatarProps extends MuiAvatarProps {
  variant: MuiAvatarProps['variant'];
  children: MuiAvatarProps['children'];
}

const Avatar = ({ variant, children }: IAvatarProps) => (
  <StyledAvatar variant={variant}>{children}</StyledAvatar>
);

export default Avatar;
