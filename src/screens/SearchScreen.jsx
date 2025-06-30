import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {SolidHeader} from '../components/CustomHeader';
import MoviesRowList from '../components/MoviesRowList';
import {useFavoriteViewModel} from '../viewModels/useFavoriteViewModel';
import CustomText from '../components/CustomText';
import Strings from '../utils/constants/Strings';
import Fonts from '../utils/constants/Fonts';
import {moviesPopular} from '../data/DataManager';

const SearchScreen = ({navigation}) => {
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
      <View style={styles.headerWrapper}>
        <SolidHeader iconSearch search iconMic />
      </View>

      <Wrapper style={styles.listContainer}>
        <CustomText textType={Fonts.semiBold} size={20}>
          Top Searches
        </CustomText>
        <MoviesRowList data={moviesPopular} />
      </Wrapper>
    </Wrapper>
  );
};

export default SearchScreen;

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
