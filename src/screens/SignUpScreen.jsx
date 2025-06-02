import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/assets/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';

const SignUpScreen = () => {
  return (
    <AuthLayout
      title={'Sign Up'}
      desc1={'Hello! Sign Up to get '}
      desc2={'started'}>
      <CustomInput icon={'user'} />
      <CustomInput icon={'email'} />
      <CustomInput icon={'lock'} secure iconRight={'passwordShow'} />
      <CustomButton buttonText={'Sign up'} />
      <Divider colored />
      <CustomButton
        buttonText={'Continue with Google'}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={'google'}
        buttonContainerStyle={styles.socialButton}
      />
      <CustomButton
        buttonText={'Continue with Facebook'}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={'facebook'}
        buttonContainerStyle={styles.socialButton}
      />
      <CustomButton
        buttonText={'Continue with Apple'}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={'apple'}
        buttonContainerStyle={styles.socialButton}
      />
      <FooterText
        text={'Already have an account?'}
        coloredText={'Log In'}
        onColoredTextPress={() => {}}
      />
    </AuthLayout>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: Colors.white_fefefe,
    borderColor: Colors.white_fefefe,
    paddingVertical: 8,
    // marginVertical: 8,
  },
});
