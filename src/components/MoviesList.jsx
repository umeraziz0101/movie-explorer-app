import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImageBox} from './CustomImage';

const MoviesList = ({data, imageSize, gridView = false}) => {
  const isGrid = Boolean(gridView);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={data}
        horizontal={!isGrid}
        numColumns={isGrid ? 3 : 1}
        scrollEnabled={!isGrid}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          // <MovieItem {...item} imageSize={imageSize} isGrid={isGrid} />
          <MovieItem item={item} imageSize={imageSize} isGrid={isGrid} />
        )}
        columnWrapperStyle={isGrid && styles.row}
        contentContainerStyle={isGrid && styles.gridContent}
      />
    </View>
  );
};

// const MovieItem = ({title, poster_path, imageSize, isGrid}) => (
const MovieItem = ({item, imageSize, isGrid}) => (
  <View style={[styles.card, isGrid && styles.cardGrid]}>
    {/* <ImageBox item={item} title={title} imageSource={poster_path} imageSize={imageSize} /> */}
    <ImageBox item={item} imageSize={imageSize} />
  </View>
);

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  card: {
    marginRight: 24,
  },
  cardGrid: {
    // flex: 1,
    // marginRight: 0,

    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },

  gridContent: {
    paddingHorizontal: 8,
  },
});
