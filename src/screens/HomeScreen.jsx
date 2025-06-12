import React, {useCallback} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import {Loader} from '../components/Loader';
import {useHomeViewModel} from '../viewModels/useHomeViewModel';
import {useFocusEffect} from '@react-navigation/native';
import Strings from '../utils/constants/Strings';
import {ImageBox} from '../components/CustomImage';
import CustomSection from '../components/CustomSection';

const HomeScreen = ({navigation}) => {
  const {user, loading, logout} = useHomeViewModel(navigation);
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          BackHandler.exitApp();
          return true;
        },
      );

      return () => subscription.remove();
    }, []),
  );

  if (loading || !user) {
    return (
      <Wrapper>
        <Loader visible={true} />
      </Wrapper>
    );
  }
  return (
    <Wrapper style={{backgroundColor: '#aa3'}}>
      <View style={styles.row}>
        <CustomText>Name: </CustomText>
        <CustomText>{user.name}</CustomText>
      </View>
      <View style={styles.row}>
        <CustomText>Email: </CustomText>
        <CustomText>{user.email}</CustomText>
      </View>

      <CustomButton
        buttonText={Strings.buttons.logOut}
        buttonContainerStyle={styles.button}
        onPress={logout}
      />
      <CustomSection sectionTitle={'Popular Movies'}>
        <ImageBox title={'Fast X'} />
      </CustomSection>
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  button: {
    marginTop: 18,
  },
});
