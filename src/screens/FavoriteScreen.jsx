import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import Strings from '../utils/constants/Strings';

const FavoriteScreen = () => {
  return (
    <Wrapper>
      <CustomText>{Strings.texts.newScreen}</CustomText>
    </Wrapper>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
