import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Colors from '../utils/constants/Colors';
import Strings from '../utils/constants/Strings';

const NotFound = () => {
  return (
    <View style={styles.container}>
      <CustomText>{Strings.texts.noDataFound}</CustomText>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black_0d0d0d,
  },
});
