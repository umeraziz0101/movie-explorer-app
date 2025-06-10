import {Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import {requestPasswordReset} from '../services/firebaseAuth';
import {useForgetPasswordViewModel} from '../viewModels/useForgetPasswordViewModel';
import {Loader} from '../components/Loader';
import CustomText from '../components/CustomText';

const ForgetPasswordScreen = ({navigation}) => {
  const {email, errors, loading, onChangeEmail, sendOTP, goToLogin} =
    useForgetPasswordViewModel(navigation);

  return (
    <AuthLayout
      title={'Forget Password'}
      desc1={"Don't worry! Please enter the"}
      desc2={'email linked with your account.'}>
      <CustomInput
        icon={'email'}
        placeholder="Email"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <CustomText style={styles.error}>{errors.email}</CustomText>
      )}
      <CustomButton buttonText={'Send Code'} onPress={sendOTP} />

      <FooterText
        text={'Remember Password?'}
        coloredText={'Log In'}
        onPressColoredText={goToLogin}
      />
      <Loader visible={loading} />
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
  error: {
    color: Colors.red_f5615d,
    marginBottom: 8,
  },
});
