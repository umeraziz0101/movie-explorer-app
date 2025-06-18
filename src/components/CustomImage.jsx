import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import Images from '../utils/assets/Images';
import Fonts from '../utils/constants/Fonts';
import Colors from '../utils/constants/Colors';
import Strings from '../utils/constants/Strings';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';

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
            // borderRadius: imageCircle ? imageCircle : 0,
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
  // title,
  // imageSource,
  item,
  imageSize = 130,
  imageRadius = 8,
}) => {
  const title = item.title;
  const imageSource = item.poster_path;
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
        <CustomText textType={Fonts.medium} size={12}>
          {title}
        </CustomText>
      )}
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate(Routes.stack.detail, {data: item});
          }}>
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
