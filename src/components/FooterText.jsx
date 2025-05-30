import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/assets/Colors';

const FooterText = ({text, coloredText, onColoredTextPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{text} </Text>
      {coloredText && (
        <Pressable onPress={onColoredTextPress}>
          <Text style={styles.coloredTextStyle}>{coloredText}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default FooterText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
