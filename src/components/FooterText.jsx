import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/assets/Colors';

const FooterText = ({
  text,
  coloredText,
  onPressColoredText,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.textStyle}>{text} </Text>
      {coloredText && (
        <Pressable onPress={onPressColoredText}>
          <Text style={styles.coloredTextStyle}>{coloredText}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default FooterText;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  textStyle: {
    fontSize: 16,
    color: Colors.white_ffffff,
    fontWeight: 'semibold',
  },
  coloredTextStyle: {
    fontSize: 16,
    color: Colors.pink_ff465f,
    fontWeight: 'bold',
  },
});
