import {StyleSheet, View} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import Strings from '../utils/constants/Strings';
import {SolidHeader} from '../components/CustomHeader';

const GenreScreen = () => {
  return (
    <Wrapper top>
      <View style={styles.headerWrapper}>
        <SolidHeader iconBack title={Strings.headerTitle.genres} />
      </View>
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
});
