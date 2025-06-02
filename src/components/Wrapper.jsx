import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/assets/Colors';

const Wrapper = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black_0d0d0d,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
  },
});
