import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {SolidHeader} from '../components/CustomHeader';
import MoviesRowList from '../components/MoviesRowList';
import CustomText from '../components/CustomText';
import Fonts from '../utils/constants/Fonts';
import {useSearchViewModel} from '../viewModels/useSearchViewModel';
import Strings from '../utils/constants/Strings';

const SearchScreen = ({navigation}) => {
  const {query, results, loading, onChangeQuery} = useSearchViewModel();
  console.log(query);

  return (
    <Wrapper top>
      <View style={styles.headerWrapper}>
        <SolidHeader
          iconSearch
          search
          iconMic
          onSearchChange={onChangeQuery}
          searchValue={query}
        />
      </View>

      <Wrapper style={styles.listContainer}>
        <CustomText textType={Fonts.semiBold} size={20}>
          {query ? Strings.texts.results : Strings.texts.topSearches}
        </CustomText>
        <MoviesRowList data={results} />
      </Wrapper>
      {loading && <Loader visible />}
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
