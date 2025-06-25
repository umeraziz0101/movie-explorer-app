import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Colors from '../utils/constants/Colors';

export const Loader = ({visible}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.pink_ff465f} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.opacity_dark,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    backgroundColor: Colors.white_ffffff,
    padding: 20,
    borderRadius: 10,
  },
});
