import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import Icon from '@react-native-vector-icons/material-design-icons';
import Colors from '../utils/constants/Colors';
import Fonts from '../utils/constants/Fonts';

const RadioButton = ({label, value, selected, onSelect}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(value)}>
      <Icon
        name={selected ? 'check-circle' : 'checkbox-blank-circle'}
        color={selected ? Colors.pink_ff465f : Colors.gray_3b3833}
        size={25}
      />
      <CustomText textType={Fonts.medium} style={styles.label}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    marginLeft: 8,
  },
});

export default RadioButton;
