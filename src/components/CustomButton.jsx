import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../utils/constants/Colors';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';

const CustomButton = ({
  buttonContainerStyle,
  transparent,
  buttonText,
  buttonTextSize,
  buttonTextType,
  leftIcon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        transparent && {backgroundColor: Colors.transparent},
        buttonContainerStyle,
      ]}
      onPress={onPress}>
      <View style={styles.row}>
        {leftIcon && (
          <CustomIcon name={leftIcon} size={20} style={styles.leftIcon} />
        )}
        <CustomText
          textType={buttonTextType ? buttonTextType : 'semiBold'}
          size={buttonTextSize ? buttonTextSize : 16}
          color={transparent ? Colors.white_ffffff : Colors.black_0d0d0d}>
          {buttonText}
        </CustomText>
      </View>
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
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.pink_ff465f,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  leftIcon: {
    marginRight: 16,
  },
});
