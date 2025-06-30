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
import {moviesPopular} from '../data/DataManager';
import {useFavoriteViewModel} from '../viewModels/useFavoriteViewModel';

const GenreScreen = () => {
  const {moviesFavorite} = useFavoriteViewModel();
  const [selectedSort, setSelectedSort] = useState('option1');
  const [selectedGenre, setSelectedGenre] = useState('option1');

  const sortOptions = [
    {label: 'Most Relevant', value: 'option1'},
    {label: 'Most Popular', value: 'option2'},
    {label: 'Most Recent', value: 'option3'},
  ];
  const genres = [
    {label: 'All', value: 'option1'},
    {label: 'Fantasy', value: 'option2'},
    {label: 'Horror', value: 'option3'},
    {label: 'Sci-fi', value: 'option4'},
    {label: 'Action', value: 'option5'},
    {label: 'History', value: 'option6'},
    {label: 'Thriller', value: 'option7'},
    {label: 'Anime', value: 'option8'},
    {label: 'Drama', value: 'option9'},
    {label: 'Romantic', value: 'option10'},
    {label: 'Comedy', value: 'option11'},
    {label: 'Crime', value: 'option12'},
  ];

  const ListHeader = () => (
    <>
      <View style={styles.headerWrapper}>
        <SolidHeader iconBack title={Strings.headerTitle.genres} />
      </View>

      <Wrapper style={styles.listContainer}>
        <CustomText textType={Fonts.semiBold}>SORT BY</CustomText>
        {sortOptions.map(opt => (
          <RadioButton
            key={opt.value}
            label={opt.label}
            value={opt.value}
            selected={selectedSort === opt.value}
            onSelect={setSelectedSort}
          />
        ))}

        <Divider style={styles.dividerStyle} bold />

        <CustomText textType={Fonts.semiBold}>GENRES</CustomText>
        <View style={styles.genresContainer}>
          {genres.map(g => (
            <View key={g.value} style={styles.genreItem}>
              <RadioButton
                label={g.label}
                value={g.value}
                selected={selectedGenre === g.value}
                onSelect={setSelectedGenre}
              />
            </View>
          ))}
        </View>

        <CustomButton buttonText="Apply Settings" onPress={() => {}} />
      </Wrapper>
    </>
  );

  return (
    <Wrapper top style={{paddingBottom: 22}}>
      <MoviesRowList
        data={moviesPopular}
        ListHeaderComponent={ListHeader}
        itemStyle={{paddingHorizontal: 16}}
        contentContainerStyle={{paddingBottom: 80}}
      />
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
