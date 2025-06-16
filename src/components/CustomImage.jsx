import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import Images from '../utils/assets/Images';
import Fonts from '../utils/constants/Fonts';
import Colors from '../utils/constants/Colors';
import Strings from '../utils/constants/Strings';

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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <View>
      {title && (
        <CustomText textType={Fonts.medium} size={12}>
          {title}
        </CustomText>
      )}
      <View>
        <Image
          source={{uri: imageSource}}
          resizeMode="cover"
          style={[
            styles1.image,
            {height: imageSize, width: imageSize, borderRadius: imageRadius},
          ]}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {imageLoading && (
          <View style={styles1.imageLoader}>
            <ActivityIndicator size={'small'} color={Colors.pink_ff465f} />
          </View>
        )}
        {imageError && (
          <View style={styles1.imageError}>
            <Text style={styles1.errorText}>
              {Strings.errors.failedToLoadImage}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  imageContainer: {},
  imageLoader: {
    position: 'absolute',
    backgroundColor: Colors.black_0d0d0d,

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.black_0d0d0d,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageError: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.black_0d0d0d,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ////////
  image: {
    marginTop: 8,
  },
});
