import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import Images from '../utils/assets/Images';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Icons from '../utils/assets/Icons';
import CustomIcon from '../components/CustomIcon';
import CustomInput from '../components/CustomInput';

const {width: screenWidth} = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <ImageBackground
      source={Images.coverSplash}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar hidden />
      <View style={styles.overlay} />
      <Icons.logo style={styles.logo} />
      <CustomButton transparent />
      <FooterText
        text={"Don't have an account"}
        coloredText={'Sign Up'}
        onColoredTextPress={() => Alert.alert('Button Pressed')}
      />
      <Icons.email width={32} height={32} />
      <CustomIcon name={'user'} size={24} />
      <CustomInput icon={'email'} iconRight={'passwordShow'} secure={true} />
      <CustomInput icon={'email'} />
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
