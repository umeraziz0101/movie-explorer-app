import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../utils/assets/Colors';

const CustomButton = ({transparent, buttonText, leftIcon}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        transparent && {backgroundColor: 'transparent'},
      ]}>
      <Text style={[styles.text, transparent && {color: Colors.white_ffffff}]}>
        Sign up
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: Colors.pink_ff465f,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.pink_ff465f,
  },
  text: {
    color: Colors.black_0d0d0d,
    fontSize: 16,
    fontWeight: 'semibold',
  },
});
