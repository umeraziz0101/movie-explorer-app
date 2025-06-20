import React, {useEffect, useRef} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import Images from '../utils/assets/Images';

import Icons from '../utils/assets/Icons';

import {useNavigation} from '@react-navigation/native';
import Constants from '../utils/constants/Constants';
import Routes from '../utils/constants/Routes';
import {auth} from '../services/firebaseConfig';
import Colors from '../utils/constants/Colors';
import CustomIcon from '../components/CustomIcon';

const {width: screenWidth} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: Constants.animationDuration,
        useNativeDriver: true,
      }).start(() => {
        auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace(Routes.tabs.root);
          } else {
            navigation.replace(Routes.stack.onBoard);
          }
        });
      });
    }, Constants.splashTimeOut);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <ImageBackground
      source={Images.coverSplash}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar hidden />
      <View style={styles.overlay} />
      <CustomIcon name={Icons.logo} size={screenWidth * 0.5} />
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
    backgroundColor: Colors.opacity_dark1,
  },
});
