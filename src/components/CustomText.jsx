import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/assets/Colors';

const fontStyles = {
  semiBold: 'Poppins-SemiBold',
  semiBoldItalic: 'Poppins-SemiBoldItalic',
  black: 'Poppins-Black',
  blackItalic: 'Poppins-BlackItalic',
  bold: 'Poppins-Bold',
  boldItalic: 'Poppins-BoldItalic',
  extraBold: 'Poppins-ExtraBold',
  extraBoldItalic: 'Poppins-ExtraBoldItalic',
  extraLight: 'Poppins-ExtraLight',
  extraLightItalic: 'Poppins-ExtraLightItalic',
  italic: 'Poppins-Italic',
  light: 'Poppins-Light',
  lightItalic: 'Poppins-LightItalic',
  medium: 'Poppins-Medium',
  mediumItalic: 'Poppins-MediumItalic',
  regular: 'Poppins-Regular',
  thin: 'Poppins-Thin',
  thinItalic: 'Poppins-ThinItalic',
};

const CustomText = ({
  textType = 'regular',
  size = 16,
  color = Colors.white_ffffff,
  style,
  children,
  ...rest
}) => {
  // const fontStyle ={
  //     semiBold: 'Poppins-SemiBold',
  //    black: 'Poppins-Black',
  //    blackItalic: 'Poppins-BlackItalic',
  //     'Poppins-Bold',
  //     'Poppins-BoldItalic',
  //     'Poppins-ExtraBold',
  //     'Poppins-ExtraBoldItalic',
  //     'Poppins-ExtraLight',
  //     'Poppins-ExtraLightItalic',
  //     'Poppins-Italic',
  //     'Poppins-Light',
  //     'Poppins-LightItalic',
  //     'Poppins-Medium',
  //     'Poppins-MediumItalic',
  //     'Poppins-Regular',
  //     'Poppins-SemiBold',
  //     'Poppins-SemiBoldItalic',
  //     'Poppins-Thin',
  //     'Poppins-ThinItalic',

  // }

  const fontFamily = fontStyles[textType] || fontStyles.regular;

  return (
    <Text style={[{fontFamily, fontSize: size, color: color}, style]} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
