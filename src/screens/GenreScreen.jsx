import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import Strings from '../utils/constants/Strings';
import {SolidHeader} from '../components/CustomHeader';
import RadioButton from '../components/RadioButton';
import Colors from '../utils/constants/Colors';
import {Divider} from 'react-native-paper';
import Fonts from '../utils/constants/Fonts';
import CustomButton from '../components/CustomButton';
import MoviesRowList from '../components/MoviesRowList';
import {useFilterViewModel} from '../viewModels/useFilterViewModel';
import {Loader} from '../components/Loader';
import NotFound from '../components/NotFound';

const GenreScreen = () => {
  const {
    sortBy,
    genre,
    results,
    loading,
    onSelectSort,
    onSelectGenre,
    applySettings,
    availableGenres,
  } = useFilterViewModel();

  const sortOptions = [
    {
      label: Strings.radioButtons.label.relevant,
      value: Strings.radioButtons.value.relevant,
    },
    {
      label: Strings.radioButtons.label.popular,
      value: Strings.radioButtons.value.popular,
    },
    {
      label: Strings.radioButtons.label.recent,
      value: Strings.radioButtons.value.recent,
    },
  ];

  const ListHeader = () => (
    <>
      <View style={styles.headerWrapper}>
        <SolidHeader iconBack title={Strings.headerTitle.genres} />
      </View>

      <Wrapper style={styles.listContainer}>
        <CustomText textType={Fonts.semiBold}>
          {Strings.texts.sortBy}
        </CustomText>
        {sortOptions.map(opt => (
          <RadioButton
            key={opt.value}
            label={opt.label}
            value={opt.value}
            selected={sortBy === opt.value}
            onSelect={onSelectSort}
          />
        ))}

        <Divider style={styles.dividerStyle} bold />

        <CustomText textType={Fonts.semiBold}>
          {Strings.texts.genres}
        </CustomText>
        <View style={styles.genresContainer}>
          {availableGenres.map(({id, name}) => (
            <View key={id} style={styles.genreItem}>
              <RadioButton
                label={name}
                value={id}
                selected={genre === id}
                onSelect={onSelectGenre}
              />
            </View>
          ))}
        </View>

        <CustomButton
          buttonText={Strings.buttons.applySettings}
          onPress={applySettings}
        />
      </Wrapper>
    </>
  );

  if (loading) {
    return (
      <Wrapper>
        <Loader visible />
      </Wrapper>
    );
  }

  if (!results?.length) {
    return <NotFound />;
  }

  return (
    <Wrapper top style={{paddingBottom: 22}}>
      <MoviesRowList
        data={results}
        ListHeaderComponent={ListHeader}
        itemStyle={{paddingHorizontal: 16}}
        contentContainerStyle={{paddingBottom: 80}}
      />
      {loading && <Loader visible />}
    </Wrapper>
  );
};

export default GenreScreen;

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
  },
  dividerStyle: {
    backgroundColor: Colors.gray_393939,
    marginVertical: 12,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreItem: {
    width: '50%',
    paddingVertical: 6,
  },
});
