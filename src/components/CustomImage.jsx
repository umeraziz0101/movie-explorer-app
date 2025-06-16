import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Images from '../utils/assets/Images';
import Fonts from '../utils/constants/Fonts';

const CustomImage = () => {
  return <View></View>;
};

export default CustomImage;

const styles = StyleSheet.create({});

export const ImageBox = ({
  title,
  imageSource,
  imageSize = 130,
  imageRadius = 8,
}) => {
  return (
    <View>
      {title && (
        <CustomText textType={Fonts.medium} size={12}>
          {title}
        </CustomText>
      )}
      <View>
        <Image
          source={imageSource}
          style={[
            styles1.image,
            {height: imageSize, width: imageSize, borderRadius: imageRadius},
          ]}
        />
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  image: {
    marginTop: 8,
  },
});
