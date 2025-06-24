import React from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {SolidHeader} from '../components/CustomHeader';
import MoviesRowList from '../components/MoviesRowList';
import {useFavoriteViewModel} from '../viewModels/useFavoriteViewModel';

const FavoriteScreen = ({navigation}) => {
  const {
    loading,
    moviesFavorite,
    refreshing,
    reloadFavoriteMovies,
    loadMoreFavoriteMovies,
  } = useFavoriteViewModel();

  if (loading) {
    return (
      <Wrapper>
        <Loader visible />
      </Wrapper>
    );
  }

  return (
    <Wrapper top>
      <View style={styles.headerWrapper}>
        <SolidHeader iconBack title="Favorites" iconFavorite />
      </View>
      <Wrapper>
        <MoviesRowList
          data={moviesFavorite}
          onEndReached={loadMoreFavoriteMovies}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
