import {StyleSheet} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/assets/Colors';

const ForgetPasswordScreen = () => {
  return (
    <AuthLayout
      title={'Forget Password'}
      desc1={"Don't worry! Please enter the"}
      desc2={'email linked with your account.'}>
      <CustomInput icon={'email'} />
      <CustomButton buttonText={'Send Code'} />

      <FooterText
        text={'Remember Password?'}
        coloredText={'Log In'}
        onColoredTextPress={() => {}}
      />
    </AuthLayout>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: Colors.white_fefefe,
    borderColor: Colors.white_fefefe,
    paddingVertical: 8,
  },
});
