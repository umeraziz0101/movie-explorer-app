import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import {useRoute} from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import {useHomeViewModel} from '../viewModels/useHomeViewModel';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../utils/constants/Colors';
import Fonts from '../utils/constants/Fonts';
import Strings from '../utils/constants/Strings';
import CustomIcon from '../components/CustomIcon';
import Icons from '../utils/assets/Icons';
import CustomSection from '../components/CustomSection';
import ReadMore from '@fawazahmed/react-native-read-more';
import CastList from '../components/CastList';
import CustomButton from '../components/CustomButton';
import MoviesList from '../components/MoviesList';
import {moviesPopular} from '../data/DataManager';
import {Loader} from '../components/Loader';

const DetailScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  // const {logout} = useHomeViewModel();
  const {data} = useRoute().params;
  const movieData = data;

  const uri = movieData.poster_path;
  const year = new Date(movieData.release_date).getFullYear();

  const {
    user,
    loading,
    logout,
    moviesPopular,
    refreshing,
    loadMorePopularMovies,
    reloadPopularMovies,
  } = useHomeViewModel(navigation);

  if (loading || !user) {
    return (
      <Wrapper>
        <Loader visible={true} />
      </Wrapper>
    );
  }

  return (
    <Wrapper top>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadPopularMovies}
          />
        }>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <CustomHeader onSignOut={logout} />
          </View>
          <View style={{height: width * 1.2, width: width}}>
            <ImageBackground
              source={{uri}}
              style={[styles.image, {width}]}
              resizeMode="cover">
              <LinearGradient
                colors={[
                  Colors.opacity_dark_max,
                  Colors.opacity_dark,
                  Colors.opacity_dark,
                ]}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0}}
                style={styles.gradient}
              />

              <View style={styles.textOverlay}>
                <CustomIcon name={Icons.play} size={65} />
                <CustomText
                  textType={Fonts.semiBold}
                  size={14}
                  style={styles.title}>
                  {Strings.texts.playTrailer}
                </CustomText>
              </View>
            </ImageBackground>
          </View>
        </View>
        <Wrapper>
          <CustomText textType={Fonts.semiBold} size={20}>
            {movieData.title}
          </CustomText>
          <View style={{flexDirection: 'row'}}>
            <CustomText size={12} color={Colors.gray_969696}>
              {year}
              {' | '}
            </CustomText>

            {data.genres.map((genre, index) => (
              <CustomText key={genre.id} size={12} color={Colors.gray_969696}>
                {index > 0 && '/'}
                {genre.name}
              </CustomText>
            ))}
          </View>
          <CustomSection
            sectionTitle={'Sinopsis'}
            titleSize={14}
            titleFont={Fonts.semiBold}>
            <ReadMore
              numberOfLines={5}
              seeMoreText=" Read More..."
              seeMoreStyle={styles.sinopsisReadMore}
              seeLessStyle={styles.sinopsisSeeLess}
              ellipsis=""
              style={styles.sinopsisText}>
              {movieData.overview}
            </ReadMore>
          </CustomSection>
          <CustomSection
            sectionTitle={'Cast'}
            titleSize={14}
            titleFont={Fonts.semiBold}>
            <CastList data={movieData.cast} />
          </CustomSection>
          {/* <Wrapper> */}
          <CustomButton leftIcon={Icons.playBlack} buttonText={'Watch Now'} />
          {/* </Wrapper> */}
          <CustomSection
            sectionTitle={'Related Movies'}
            titleFont={Fonts.semiBold}
            titleSize={14}>
            {/* <MoviesList /> */}
            <MoviesList
              data={moviesPopular}
              imageSize={100}
              gridView
              onEndReached={loadMorePopularMovies}
            />
          </CustomSection>
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',

    borderBottomWidth: 1,
    borderColor: Colors.gray_6c6c6c,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    justifyContent: 'center',
  },
  textOverlay: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginTop: 16,
  },
  sinopsisText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.gray_969696,
    lineHeight: 18,
    textAlign: 'justify',
  },
  sinopsisReadMore: {
    textType: Fonts.regular,
    size: 12,
    color: Colors.pink_ff465f,
  },
  sinopsisSeeLess: {
    textType: Fonts.regular,
    size: 12,
    color: Colors.pink_ff465f,
  },
});
