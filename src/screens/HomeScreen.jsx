import React from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {useHomeViewModel} from '../viewModels/useHomeViewModel';
import Strings from '../utils/constants/Strings';
import CustomSection from '../components/CustomSection';
import MoviesList from '../components/MoviesList';
import MoviesCarousel from '../components/MoviesCarousel';
import Icons from '../utils/assets/Icons';
import CustomIcon from '../components/CustomIcon';
import NotFound from '../components/NotFound';
import Keys from '../utils/constants/Keys';
import Colors from '../utils/constants/Colors';

const HomeScreen = ({navigation}) => {
  const {
    user,
    loading,
    logout,
    trendingToday,
    lastMonth,
    lastSixMonths,
    popular,
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

  if (!trendingToday.length && !popular.length) {
    return <NotFound />;
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
        <MoviesCarousel movies={trendingToday} onSignOut={logout} />
        <Wrapper style={styles.listBackground}>
          <CustomIcon
            name={Icons.backgroundHome}
            size={'100%'}
            fill="none"
            style={StyleSheet.absoluteFill}
          />

          <CustomSection sectionTitle={Strings.section.popularMovies}>
            <MoviesList
              listKey={Keys.moviesList.popularMonth}
              data={popular}
              onEndReached={loadMorePopularMovies}
            />
          </CustomSection>
          <CustomSection sectionTitle={Strings.section.lastMonth}>
            {lastMonth.length === 0 ? (
              <NotFound style={styles.transparent} />
            ) : (
              <MoviesList
                listKey={Keys.moviesList.popularLastMonth}
                data={lastMonth}
              />
            )}
          </CustomSection>
          <CustomSection sectionTitle={Strings.section.lastSixMonth}>
            {lastSixMonths.length === 0 ? (
              <NotFound style={styles.transparent} />
            ) : (
              <MoviesList
                listKey={Keys.moviesList.popularLastSix}
                data={lastSixMonths}
                imageSize={100}
                gridView
              />
            )}
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
  transparent: {
    backgroundColor: Colors.transparent,
    paddingVertical: 20,
  },
  listBackground: {paddingTop: 0},
});
