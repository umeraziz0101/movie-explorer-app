import React, {useEffect} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Images from '../utils/assets/Images';

import Icons from '../utils/assets/Icons';

import {useNavigation} from '@react-navigation/native';
import Constants from '../utils/constants/Constants';
import Routes from '../utils/constants/Routes';
import {auth} from '../services/firebaseConfig';

const {width: screenWidth} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          navigation.replace(Routes.tabs.home);
        } else {
          navigation.replace(Routes.stack.onBoard);
        }
      });
    }, Constants.splashTimeOut);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <ImageBackground
      source={Images.coverSplash}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar hidden />
      <View style={styles.overlay} />
      <Icons.logo style={styles.logo} />

      {/* <Icons.email width={32} height={32} /> */}
      {/* <CustomIcon name={'user'} size={24} /> */}
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
  },
});
