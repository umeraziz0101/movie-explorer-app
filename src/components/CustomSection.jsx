import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Fonts from '../utils/constants/Fonts';

const CustomSection = ({
  containerStyle,
  sectionTitle,
  titleSize = 20,
  titleFont = Fonts.medium,
  children,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText textType={titleFont} size={titleSize}>
        {sectionTitle}
      </CustomText>
      {children}
    </View>
  );
};

export default CustomSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
