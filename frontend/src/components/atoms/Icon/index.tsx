import React from 'react';

interface IconProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Icon: React.FC<IconProps> = ({
  src,
  alt,
  width,
  height,
  style,
  ...props
}) => (
  <img
    src={src}
    alt={alt}
    style={style}
    height={height}
    width={width}
    {...props}
  />
);

Icon.defaultProps = {
  width: 'auto',
  height: 'auto',
  style: {},
  onClick: () => {},
};

export default Icon;
