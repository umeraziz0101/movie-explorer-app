import React from 'react';
import Icons from '../utils/assets/Icons';

const CustomIcon = ({name, size, fill, style}) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    console.warn(`No icon found for name="${name}"`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      fill={fill ? fill : 'transparent'}
      style={style}
    />
  );
};

export default CustomIcon;
