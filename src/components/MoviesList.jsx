import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {ImageBox} from './CustomImage';

const MoviesList = ({data, listKey, imageSize, gridView = false, ...rest}) => {
  const isGrid = Boolean(gridView);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={data}
        listKey={listKey}
        horizontal={!isGrid}
        numColumns={isGrid ? 3 : 1}
        scrollEnabled={!isGrid}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <MovieItem item={item} imageSize={imageSize} isGrid={isGrid} />
        )}
        columnWrapperStyle={isGrid && styles.row}
        contentContainerStyle={isGrid && styles.gridContent}
        onEndReachedThreshold={0.5}
        onEndReached={rest.onEndReached}
        {...rest}
      />
    </View>
  );
};

const MovieItem = ({item, imageSize, isGrid}) => (
  <View style={[styles.card, isGrid && styles.cardGrid]}>
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
    marginBottom: 16,
  },
  row: {
    justifyContent: 'flex-start',
  },

  gridContent: {
    paddingHorizontal: 8,
  },
});
