import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Colors from '../utils/constants/Colors';
import Strings from '../utils/constants/Strings';

const Divider = ({colored}) => {
  return (
    <View style={styles.container}>
      <View style={styles.border} />
      <CustomText
        textType="regular"
        size={14}
        style={[styles.text, colored && {color: Colors.pink_ff465f}]}>
        {Strings.texts.or}
      </CustomText>
      <View style={styles.border} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 16,
  },
  border: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.white_ffffff,
  },
});
