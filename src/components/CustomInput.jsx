import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomIcon from './CustomIcon';
import Colors from '../utils/constants/Colors';
import Strings from '../utils/constants/Strings';

const CustomInput = ({
  icon,
  secure = false,
  iconRight,
  containerStyle,
  ...rest
}) => {
  const [secureText, setSecureText] = useState(secure);
  const onPressPasswordShow = () => {
    setSecureText(prev => !prev);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomIcon name={icon} size={24} />
      <TextInput
        style={[styles.input]}
        secureTextEntry={secureText}
        {...(secure && {autoCapitalize: 'none'})}
        placeholderTextColor={Colors.gray_535353}
        {...rest}
      />
      {iconRight && (
        <TouchableOpacity onPress={onPressPasswordShow}>
          <CustomIcon name={iconRight} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderColor: Colors.gray_535353,
    borderWidth: 2,
    borderRadius: 12,
    marginVertical: 10,
  },
  input: {
    marginHorizontal: 16,
    flex: 1,
    color: Colors.white_ffffff,
    fontSize: 16,

    fontFamily: 'Poppins-SemiBold',
  },
});

export const CustomInputBox = (
  {nextRef, prevRef, containerStyle, ...rest},
  ref,
) => {
  const [value, setValue] = useState(Strings.texts.empty);

  const handleChangeText = text => {
    setValue(text);
    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const handleKeyPress = ({nativeEvent}) => {
    if (
      nativeEvent.key === 'Backspace' &&
      value.length === 0 &&
      prevRef &&
      prevRef.current
    ) {
      prevRef.current.focus();
    }
  };
  return (
    <View style={[styles1.container, containerStyle]}>
      <TextInput
        style={[styles1.input]}
        ref={ref}
        placeholderTextColor={Colors.white_ffffff}
        keyboardType="numeric"
        maxLength={1}
        textAlign="center"
        value={value}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        {...rest}
      />
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    width: '70',
    height: '70',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.gray_535353,

    borderRadius: 12,
  },
  input: {
    width: '100%',
    height: '100%',
    color: Colors.white_ffffff,
    fontSize: 22,
    paddingHorizontal: '12',
    fontFamily: 'Poppins-Bold',
  },
});
