import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomIcon from './CustomIcon';
import Colors from '../utils/assets/Colors';

const CustomInput = ({icon, secure = false, iconRight}) => {
  const [secureText, setSecureText] = useState(secure);
  const onPressPasswordShow = () => {
    setSecureText(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <CustomIcon name={icon} size={30} />
      <TextInput
        style={[styles.input]}
        secureTextEntry={secureText}
        {...(secure && {autoCapitalize: 'none'})}
        placeholderTextColor={Colors.white_ffffff}
      />
      {iconRight && (
        <TouchableOpacity onPress={onPressPasswordShow}>
          <CustomIcon name={iconRight} size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#aa3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: Colors.white_ffffff,
    borderWidth: 2,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#a33',
    marginHorizontal: 16,

    flex: 1,
    color: Colors.white_ffffff,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
