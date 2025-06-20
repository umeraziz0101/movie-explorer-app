import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Colors from '../utils/constants/Colors';
import CustomText from './CustomText';
import Fonts from '../utils/constants/Fonts';
import CustomHeader from './CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../utils/constants/Constants';

const MoviesCarousel = ({movies, onSignOut}) => {
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <CustomHeader logo onSignOut={onSignOut} />
      </View>

      <Carousel
        width={width}
        height={width * 1.2}
        data={movies}
        scrollAnimationDuration={Constants.carousel.ScrollAnimationDuration}
        autoPlay={true}
        loop={true}
        autoPlayInterval={Constants.carousel.AutoPlayInterval}
        onSnapToItem={index => setCurrentIndex(index)}
        renderItem={({item}) => {
          const uri = item.poster_path;

          return (
            <ImageBackground
              source={{uri}}
              style={[styles.image, {width}]}
              resizeMode="cover">
              <LinearGradient
                colors={[Colors.opacity_dark1, Colors.transparent]}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0}}
                style={styles.gradient}
              />
              <View style={styles.textOverlay}>
                <CustomText
                  textType={Fonts.semiBold}
                  size={20}
                  style={styles.title}
                  numberOfLines={1}>
                  {item.original_title}
                </CustomText>
                <CustomText size={12} style={styles.overview} numberOfLines={3}>
                  {item.overview}
                </CustomText>
              </View>
            </ImageBackground>
          );
        }}
      />

      <View style={styles.pagination}>
        {movies.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default MoviesCarousel;

const styles = StyleSheet.create({
  container: {position: 'relative'},
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  textOverlay: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginBottom: 15,
  },
  overview: {
    lineHeight: 18,
    marginTop: 20,
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {width: 12, height: 12, borderRadius: 6, marginHorizontal: 6},
  dotActive: {backgroundColor: Colors.gray_d9d9d9},
  dotInactive: {backgroundColor: Colors.gray_6c6c6c},
});
