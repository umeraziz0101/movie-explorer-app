// src/screens/FavoriteScreen.jsx
import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {SolidHeader} from '../components/CustomHeader';
import MoviesRowList from '../components/MoviesRowList';
import {useFavoriteViewModel} from '../viewModels/useFavoriteViewModel';
import CustomText from '../components/CustomText';

const FavoriteScreen = ({navigation}) => {
  const {
    loading,
    moviesFavorite,
    refreshing,
    reloadFavoriteMovies,
    removeFavorite,
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadFavoriteMovies}
          />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerWrapper}>
          <SolidHeader iconBack title="Favorites" iconFavorite />
        </View>

        <Wrapper style={styles.listContainer}>
          {moviesFavorite.length === 0 ? (
            <CustomText>No favorites yet.</CustomText>
          ) : (
            <MoviesRowList data={moviesFavorite} onRemove={removeFavorite} />
          )}
        </Wrapper>
      </ScrollView>
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
