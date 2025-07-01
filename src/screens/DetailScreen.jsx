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
import {Loader} from '../components/Loader';
import Colors from '../utils/constants/Colors';
import Fonts from '../utils/constants/Fonts';
import Strings from '../utils/constants/Strings';
import Icons from '../utils/assets/Icons';
import MoviesList from '../components/MoviesList';
import Wrapper from '../components/Wrapper';
import CustomIcon from '../components/CustomIcon';
import {Rating} from 'react-native-ratings';
import {moviesPopular} from '../data/DataManager';
import CustomReadMore from '../components/CustomReadMore';
import NotFound from '../components/NotFound';

const DetailScreen = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const {data: movie} = useRoute().params;

  const {user, loading, logout, similarMovies, isFavorite, toggleFavorite} =
    useDetailViewModel(movie, navigation);

  if (loading || !user) {
    return (
      <Wrapper>
        <Loader visible={true} />
      </Wrapper>
    );
  }

  const year = new Date(movie.release_date).getFullYear();
  const formatRuntime = mins => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}min`;
  };

  return (
    <Wrapper top style={styles.mainContainer}>
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
        <Wrapper>
          <CustomText textType={Fonts.semiBold} size={20}>
            {movie.title}
          </CustomText>
          <View style={styles.row}>
            <CustomText size={12} color={Colors.gray_969696}>
              {year} {Strings.separators.pipe}
              {Strings.texts.emptySpace}
              {movie.genres.map(
                (g, i) =>
                  (i > 0 ? Strings.separators.slash : Strings.texts.empty) +
                  g.name,
              )}
              {Strings.separators.pipe}
              {formatRuntime(movie.runtime)}
              {Strings.texts.emptySpace}
            </CustomText>
            <CustomIcon name={Icons.clock} size={16} />
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                imageSize={16}
                readonly
                ratingCount={5}
                startingValue={movie.vote_average / 2}
                fractions={1}
                ratingColor={Colors.yellow_ffd60a}
                tintColor={Colors.black_0d0d0d}
              />
            </View>
          </View>

          <CustomSection
            sectionTitle={Strings.section.synopsis}
            titleFont={Fonts.semiBold}>
            <CustomReadMore
              numberOfLines={5}
              seeMoreText={Strings.texts.readMore}
              seeMoreStyle={styles.readMore}
              seeLessStyle={styles.readMore}
              style={styles.synopsis}>
              {movie.overview}
            </CustomReadMore>
          </CustomSection>

          <CustomSection
            sectionTitle={Strings.section.cast}
            titleFont={Fonts.semiBold}>
            {movie.cast.length === 0 ? (
              <NotFound />
            ) : (
              <CastList data={movie.cast} />
            )}
          </CustomSection>
          <CustomButton
            leftIcon={Icons.playBlack}
            buttonText={Strings.buttons.watchNow}
          />
          <CustomSection
            sectionTitle={Strings.section.relatedMovies}
            titleFont={Fonts.semiBold}
            titleSize={14}>
            {moviesPopular.length === 0 ? (
              <NotFound />
            ) : (
              <MoviesList data={moviesPopular} imageSize={100} gridView />
            )}
          </CustomSection>
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 20,
  },
  row: {flexDirection: 'row'},
  ratingContainer: {marginLeft: 'auto'},
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
  readLess: {
    color: Colors.pink_ff465f,
    fontFamily: Fonts.regular,
  },
});
