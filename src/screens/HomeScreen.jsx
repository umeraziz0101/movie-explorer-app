import React from 'react';
import {StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';

import {Loader} from '../components/Loader';

import {useHomeViewModel} from '../viewModels/useHomeViewModel';

const HomeScreen = ({navigation}) => {
  const {user, loading, logout} = useHomeViewModel(navigation);

  return (
    <Wrapper>
      <View style={styles.row}>
        <CustomText>Name: </CustomText>
        <CustomText>{user.name}</CustomText>
      </View>
      <View style={styles.row}>
        <CustomText>email: </CustomText>
        <CustomText>{user.email}</CustomText>
      </View>
      <CustomButton
        buttonText={'Log out'}
        buttonContainerStyle={styles.button}
        onPress={logout}
      />
      <Loader visible={loading} />
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 18,
  },
});
