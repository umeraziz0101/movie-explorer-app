import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Fonts from '../utils/constants/Fonts';

const CustomSection = ({sectionTitle, children}) => {
  return (
    <View style={styles.container}>
      <CustomText textType={Fonts.medium} size={20}>
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
