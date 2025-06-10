import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';

import {Loader} from '../components/Loader';
import {useSignUpViewModel} from '../viewModels/useSignUpViewModel';

const SignUpScreen = ({navigation}) => {
  const {
    name,
    email,
    password,
    errors,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    signUp,
    goToLogin,
  } = useSignUpViewModel(navigation);

  return (
    <AuthLayout
      title={'Sign Up'}
      desc1={'Hello! Sign Up to get '}
      desc2={'started'}>
      <CustomInput
        icon={'user'}
        placeholder="Name"
        value={name}
        onChangeText={onChangeName}
      />
      {errors.name && (
        <CustomText style={styles.error}>{errors.name}</CustomText>
      )}
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
      <CustomInput
        icon={'lock'}
        placeholder="Password"
        secure
        iconRight={'passwordShow'}
        value={password}
        onChangeText={onChangePassword}
        autoCapitalize="none"
      />
      {errors.password && (
        <CustomText style={styles.error}>{errors.password}</CustomText>
      )}
      <CustomButton buttonText={'Sign up'} onPress={signUp} />

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
        onPressColoredText={goToLogin}
      />
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default SignUpScreen;

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
