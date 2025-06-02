import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Wrapper from './Wrapper';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';

const AuthLayout = ({title, desc1, desc2, descStyle, children}) => {
  return (
    <Wrapper>
      <CustomIcon name={'logo'} size={79} />
      <CustomText textType="semiBold" size={24} style={styles.title}>
        {title}
      </CustomText>
      <View style={[styles.descriptionContainer, descStyle]}>
        <CustomText size={20} textType="semiBold">
          {desc1}
        </CustomText>
        <CustomText size={20} textType="semiBold">
          {desc2}
        </CustomText>
      </View>
      {children}
    </Wrapper>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  title: {alignSelf: 'center'},
  descriptionContainer: {
    marginVertical: 20,
  },
});
