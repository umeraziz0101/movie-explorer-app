import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {SolidHeader} from '../components/CustomHeader';
import MoviesRowList from '../components/MoviesRowList';
import {useFavoriteViewModel} from '../viewModels/useFavoriteViewModel';
import Strings from '../utils/constants/Strings';
import NotFound from '../components/NotFound';

const FavoriteScreen = ({navigation}) => {
  const {
    loading,
    moviesFavorite,
    refreshing,
    reloadFavoriteMovies,
    removeFavorite,
  } = useFavoriteViewModel();

  return (
    <Wrapper top>
      <View style={styles.headerWrapper}>
        <SolidHeader
          iconBack
          title={Strings.headerTitle.favorites}
          iconFavorite
        />
      </View>

      <Wrapper style={styles.listContainer}>
        {moviesFavorite.length === 0 ? (
          <NotFound />
        ) : (
          <MoviesRowList data={moviesFavorite} onRemove={removeFavorite} />
        )}
      </Wrapper>
      {loading && <Loader visible />}
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
  listContainer: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
});
