import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/constants/Colors';
import Fonts from '../utils/constants/Fonts';

const CustomText = ({
  textType = Fonts.regular,
  size = 16,
  color = Colors.white_ffffff,
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      style={[{fontFamily: textType, fontSize: size, color: color}, style]}
      {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
