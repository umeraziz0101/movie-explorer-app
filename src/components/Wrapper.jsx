import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/constants/Colors';

const Wrapper = ({children, statusBarHidden = false, style, top}) => {
  return (
    <View style={[top ? styles.ContainerTop : styles.container, style]}>
      <StatusBar barStyle={'light-content'} hidden={statusBarHidden} />
      {children}
    </View>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black_0d0d0d,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  ContainerTop: {
    backgroundColor: Colors.black_0d0d0d,
    flex: 1,
    // paddingHorizontal: 16,
    // paddingTop: 30,
  },
});
