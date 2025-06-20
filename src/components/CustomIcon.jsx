import React from 'react';
import Colors from '../utils/constants/Colors';

const CustomIcon = ({name, size, fill, style}) => {
  const IconComponent = name;
  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      fill={fill ? fill : Colors.transparent}
      style={style}
    />
  );
};

export default CustomIcon;
