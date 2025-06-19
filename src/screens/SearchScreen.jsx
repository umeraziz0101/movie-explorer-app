import {StyleSheet} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import Strings from '../utils/constants/Strings';

const SearchScreen = () => {
  return (
    <Wrapper>
      <CustomText>{Strings.texts.newScreen}</CustomText>
    </Wrapper>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
