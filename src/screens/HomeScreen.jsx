import React, {useCallback, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  BackHandler,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {useHomeViewModel} from '../viewModels/useHomeViewModel';

import Strings from '../utils/constants/Strings';
import CustomSection from '../components/CustomSection';
import {moviesPopularToday} from '../data/DataManager';
import MoviesList from '../components/MoviesList';
import MoviesCarousel from '../components/MoviesCarousel';
import Icons from '../utils/assets/Icons';
import CustomIcon from '../components/CustomIcon';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
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
        <MoviesCarousel movies={moviesPopularToday} onSignOut={logout} />
        <Wrapper>
          <CustomIcon
            name={Icons.backgroundHome}
            size={'100%'}
            fill="none"
            style={StyleSheet.absoluteFill}
          />

          <CustomSection sectionTitle={Strings.section.popularMovies}>
            <MoviesList
              data={moviesPopular}
              onEndReached={loadMorePopularMovies}
            />
          </CustomSection>
          <CustomSection sectionTitle={Strings.section.lastMonth}>
            <MoviesList
              data={moviesPopular}
              onEndReached={loadMorePopularMovies}
            />
          </CustomSection>
          <CustomSection sectionTitle={Strings.section.lastSixMonth}>
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

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  button: {
    marginTop: 18,
  },
});
