import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Wrapper from './Wrapper';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';
import Strings from '../utils/constants/Strings';
import Fonts from '../utils/constants/Fonts';
import Icons from '../utils/assets/Icons';

const AuthLayout = ({title, desc1, desc2, descStyle, children}) => {
  return (
    <Wrapper>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CustomIcon name={Icons.logo} size={79} />
        <CustomText textType={Fonts.semiBold} size={24} style={styles.title}>
          {title}
        </CustomText>
        <View style={[styles.descriptionContainer, descStyle]}>
          <CustomText size={20} textType={Fonts.semiBold}>
            {desc1}
          </CustomText>
          <CustomText size={20} textType={Fonts.semiBold}>
            {desc2}
          </CustomText>
        </View>
        {children}
      </ScrollView>
    </Wrapper>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  title: {alignSelf: 'center'},
  descriptionContainer: {
    marginVertical: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
