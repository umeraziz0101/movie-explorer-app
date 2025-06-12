import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';
import Routes from '../utils/constants/Routes';

import {Loader} from '../components/Loader';
import {useLoginViewModel} from '../viewModels/useLoginViewModel';
import Strings from '../utils/constants/Strings';

const LoginScreen = ({navigation}) => {
  const {
    email,
    password,
    errors,
    loading,
    onChangeEmail,
    onChangePassword,
    login,
    socialSignIn,
    goToSignUp,
  } = useLoginViewModel(navigation);

  return (
    <AuthLayout
      title={Strings.headerTitle.logIn}
      desc1={Strings.headerDescription.welcomeBack}
      desc2={Strings.headerDescription.seeYouAgain}>
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
      <View style={styles.row}>
        <CustomText textType="regular" size={14}>
          {Strings.texts.rememberMe}
        </CustomText>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.stack.forgetPassword)}>
          <CustomText color={Colors.pink_ff465f} textType="medium" size={14}>
            {Strings.texts.forgetPassword}
          </CustomText>
        </TouchableOpacity>
      </View>
      <CustomButton buttonText={Strings.buttons.logIn} onPress={login} />
      <Divider />
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
        leftIcon={Strings.icons.apple}
        buttonContainerStyle={styles.socialButton}
      />
      <FooterText
        text={Strings.texts.dontHaveAccount}
        coloredText={Strings.texts.signUp}
        onPressColoredText={goToSignUp}
      />
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: Colors.white_fefefe,
    borderColor: Colors.white_fefefe,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  error: {
    color: Colors.red_f5615d,
    marginBottom: 8,
  },
});
