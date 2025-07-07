import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';

import Fonts from '../utils/constants/Fonts';
import Colors from '../utils/constants/Colors';
import Strings from '../utils/constants/Strings';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import {buildImageUrl} from '../utils/image';
import Images from '../utils/assets/Images';

const CustomImage = ({local, imageSource, imageSize = 130, imageCircle}) => {
  imageCircle = imageSize / 2;
  return (
    <View>
      <Image
        source={local ? imageSource : {uri: imageSource}}
        resizeMode="cover"
        style={[
          styles.image,
          {
            height: imageSize,
            width: imageSize,

            borderRadius: imageCircle,
          },
        ]}
      />
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  image: {},
});

export const ImageBox = ({
  item,
  imageSize = 130,
  imageRadius = 8,
  imageMarginTop = 8,
}) => {
  const castName = item.name;
  const title = item.title || item.known_for_department;
  const rawPath = item.poster_path || item.profile_path;
  const imageSource = buildImageUrl(rawPath);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();

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
        <View style={[styles1.titleContainer, {width: imageSize}]}>
          <CustomText
            textType={Fonts.medium}
            size={12}
            style={castName && styles1.castTypeText}
            numberOfLines={1}>
            {title}
          </CustomText>
        </View>
      )}
      <View>
        <Pressable
          onPress={() => {
            !castName
              ? navigation.navigate(Routes.stack.detail, {movieId: item.id})
              : null;
          }}>
          <Image
            source={{uri: imageSource ? imageSource : Images.dummy}}
            resizeMode="cover"
            style={{
              height: imageSize,
              width: imageSize,
              borderRadius: imageRadius,
              marginTop: imageMarginTop,
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Pressable>
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
        {castName && (
          <View style={[styles1.castName, {width: imageSize}]}>
            <CustomText
              size={12}
              numberOfLines={2}
              style={styles1.castNameText}>
              {castName}
            </CustomText>
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
  castTypeText: {alignSelf: 'center'},
  castName: {marginTop: 4, alignSelf: 'center'},
  castNameText: {
    textAlign: 'center',
    flexWrap: 'wrap',
  },

  titleContainer: {
    flexShrink: 1,
  },
});
