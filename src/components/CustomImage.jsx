import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Images from '../utils/assets/Images';

const CustomImage = () => {
  return (
    <View>
      <Text>CustomImage</Text>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({});

export const ImageBox = ({title, imageSize = 130}) => {
  return (
    <View>
      {title && (
        <CustomText textType="medium" size={12}>
          {title}
        </CustomText>
      )}
      <View>
        <Image
          source={Images.coverOnBoard}
          style={[styles1.image, {height: imageSize, width: imageSize}]}
        />
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  image: {
    marginTop: 8,
    borderRadius: 8,
  },
});
