import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Images from '../utils/assets/Images';
import CustomButton from '../components/CustomButton';
import Icons from '../utils/assets/Icons';
import CustomText from '../components/CustomText';
import Wrapper from '../components/Wrapper';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';

const {width: screenWidth} = Dimensions.get('window');

const OnBoardScreen = () => {
  const navigation = useNavigation();
  const onPressLogin = () => {
    navigation.navigate(Routes.stack.login);
  };
  const onPressSignUp = () => {
    navigation.navigate(Routes.stack.signUp);
  };
  const onPressGuest = () => {
    navigation.navigate(Routes.tabs.home);
  };

  return (
    <Wrapper statusBarHidden={true} style={styles.container}>
      <ImageBackground
        source={Images.coverOnBoard}
        resizeMode="cover"
        style={styles.background}>
        <Icons.logo style={styles.logo} />
        <CustomText size={20} textType="semiBold">
          {Strings.texts.watchMovies}
        </CustomText>
        <CustomText size={20} textType="semiBold" style={styles.text}>
          {Strings.texts.anytimeAnywhere}
        </CustomText>

        <View style={styles.footer}>
          <CustomButton
            buttonText={Strings.buttons.logIn}
            onPress={onPressLogin}
          />
          <CustomButton
            buttonText={Strings.buttons.signUp}
            transparent
            onPress={onPressSignUp}
          />
          <TouchableOpacity onPress={onPressGuest}>
            <CustomText>{Strings.texts.continueAsGuest}</CustomText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Wrapper>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    marginBottom: 50,
  },
  text: {
    marginBottom: 90,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
