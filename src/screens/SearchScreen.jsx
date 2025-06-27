import {StyleSheet, View} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import Strings from '../utils/constants/Strings';
import {SolidHeader} from '../components/CustomHeader';

const SearchScreen = () => {
  return (
    <Wrapper top>
      <View style={styles.headerWrapper}>
        <SolidHeader iconSearch title={Strings.headerTitle.favorites} iconMic />
      </View>
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
});
