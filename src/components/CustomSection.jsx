import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';

const CustomSection = ({sectionTitle, children}) => {
  return (
    <View>
      <CustomText textType="medium" size={20}>
        {sectionTitle}
      </CustomText>
      {children}
    </View>
  );
};

export default CustomSection;

const styles = StyleSheet.create({});
