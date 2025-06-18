import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';

const FavoriteScreen = () => {
  return (
    <Wrapper style={{flex: 1}}>
      <CustomText>Favorite Screen</CustomText>
    </Wrapper>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
