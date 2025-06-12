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
import {useLoginViewModel} from '../viewModels/useLoginViewModel';
import Strings from '../utils/constants/Strings';

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
  const {socialSignIn} = useLoginViewModel(navigation);

  return (
    <AuthLayout
      title={Strings.headerTitle.signUp}
      desc1={Strings.headerDescription.signUp}
      desc2={Strings.headerDescription.started}>
      <CustomInput
        icon={Strings.icons.user}
        placeholder={Strings.inputPlaceholder.name}
        value={name}
        onChangeText={onChangeName}
      />
      {errors.name && (
        <CustomText style={styles.error}>{errors.name}</CustomText>
      )}
      <CustomInput
        icon={Strings.icons.email}
        placeholder={Strings.inputPlaceholder.email}
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <CustomText style={styles.error}>{errors.email}</CustomText>
      )}
      <CustomInput
        icon={Strings.icons.lock}
        placeholder={Strings.inputPlaceholder.password}
        secure
        iconRight={Strings.icons.passwordShow}
        value={password}
        onChangeText={onChangePassword}
        autoCapitalize="none"
      />
      {errors.password && (
        <CustomText style={styles.error}>{errors.password}</CustomText>
      )}
      <CustomButton buttonText={Strings.buttons.signUp} onPress={signUp} />

      <Divider colored />
      <CustomButton
        buttonText={Strings.buttons.google}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={Strings.icons.google}
        buttonContainerStyle={styles.socialButton}
        onPress={() => socialSignIn(Strings.icons.google)}
      />
      <CustomButton
        buttonText={Strings.buttons.facebook}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={Strings.icons.facebook}
        buttonContainerStyle={styles.socialButton}
        onPress={() => socialSignIn(Strings.icons.facebook)}
      />
      <CustomButton
        buttonText={Strings.buttons.apple}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={Strings.icons.facebook}
        buttonContainerStyle={styles.socialButton}
      />
      <FooterText
        text={Strings.texts.alreadyHaveAccount}
        coloredText={Strings.texts.logIn}
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
