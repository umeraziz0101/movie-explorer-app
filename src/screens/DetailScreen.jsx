import {StyleSheet} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import {useRoute} from '@react-navigation/native';

const DetailScreen = () => {
  const {data} = useRoute().params;
  return (
    <Wrapper>
      <CustomText>{data.title}</CustomText>
    </Wrapper>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
