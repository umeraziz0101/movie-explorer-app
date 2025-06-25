// src/screens/DetailScreen.jsx
import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDetailViewModel} from '../viewModels/useDetailViewModel';
import CustomHeader from '../components/CustomHeader';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import CustomSection from '../components/CustomSection';
import CastList from '../components/CastList';
import MoviesCarousel from '../components/MoviesCarousel';
import ReadMore from '@fawazahmed/react-native-read-more';
import {Loader} from '../components/Loader';
import Colors from '../utils/constants/Colors';
import Fonts from '../utils/constants/Fonts';
import Strings from '../utils/constants/Strings';
import Icons from '../utils/assets/Icons';
import MoviesList from '../components/MoviesList';
import Wrapper from '../components/Wrapper';

const DetailScreen = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const {data: movie} = useRoute().params;

  const {user, loading, logout, similarMovies, isFavorite, toggleFavorite} =
    useDetailViewModel(movie, navigation);
  console.log('similar movies:', similarMovies);

  if (loading || !user) {
    return (
      <Wrapper>
        <Loader visible={true} />
      </Wrapper>
    );
  }

  const year = new Date(movie.release_date).getFullYear();

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{uri: movie.poster_path}}
          style={{width, height: width * 1.2}}
          resizeMode="cover">
          <CustomHeader
            logo={false}
            onSignOut={logout}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        </ImageBackground>

        <View style={styles.content}>
          <CustomText textType={Fonts.semiBold} size={20}>
            {movie.title}
          </CustomText>
          <CustomText size={12} color={Colors.gray_969696}>
            {year} {' | '}{' '}
            {movie.genres.map((g, i) => (i > 0 ? '/' : '') + g.name)}
          </CustomText>

          <CustomSection sectionTitle="Synopsis" titleFont={Fonts.semiBold}>
            <ReadMore
              numberOfLines={5}
              seeMoreText=" Read More..."
              seeMoreStyle={styles.readMore}
              seeLessStyle={styles.readMore}
              ellipsis=""
              style={styles.synopsis}>
              {movie.overview}
            </ReadMore>
          </CustomSection>

          <CustomSection sectionTitle="Cast" titleFont={Fonts.semiBold}>
            <CastList data={movie.cast} />
          </CustomSection>
          <CustomButton leftIcon={Icons.playBlack} buttonText={'Watch Now'} />
          <CustomSection
            sectionTitle={'Related Movies'}
            titleFont={Fonts.semiBold}
            titleSize={14}>
            {/* <MoviesList /> */}
            <MoviesList
              data={similarMovies}
              imageSize={100}
              gridView
              // onEndReached={loadMorePopularMovies}
            />
          </CustomSection>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: Colors.black_0d0d0d,
    flex: 1,
  },
  synopsis: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.gray_969696,
    textAlign: 'justify',
  },
  readMore: {
    color: Colors.pink_ff465f,
    fontFamily: Fonts.regular,
  },
});
