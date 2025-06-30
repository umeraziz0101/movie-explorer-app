import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/constants/Colors';
import CustomText from './CustomText';
import Fonts from '../utils/constants/Fonts';
import Strings from '../utils/constants/Strings';

const FooterText = ({
  text,
  coloredText,
  onPressColoredText,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        <CustomText textType={Fonts.medium} size={14}>
          {text}
          {Strings.texts.emptySpace}
        </CustomText>
        {coloredText && (
          <Pressable onPress={onPressColoredText}>
            <CustomText
              size={14}
              color={Colors.pink_ff465f}
              textType={Fonts.semiBold}>
              {coloredText}
            </CustomText>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FooterText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
  },
});
