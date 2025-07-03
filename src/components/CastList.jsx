import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {ImageBox} from './CustomImage';

const CastList = ({data, ...rest}) => {
  return (
    <View style={[styles.container]}>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CastItem item={item} />}
        {...rest}
      />
    </View>
  );
};

const CastItem = ({item}) => (
  <View style={[styles.card]}>
    <ImageBox item={item} imageSize={72} imageRadius={0} imageMarginTop={2} />
  </View>
);

export default CastList;

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
});
