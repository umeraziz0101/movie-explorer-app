import {StyleSheet} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import {useForgetPasswordViewModel} from '../viewModels/useForgetPasswordViewModel';
import {Loader} from '../components/Loader';
import CustomText from '../components/CustomText';
import Strings from '../utils/constants/Strings';
import Icons from '../utils/assets/Icons';

const ForgetPasswordScreen = ({navigation}) => {
  const {email, errors, loading, onChangeEmail, sendOTP, goToLogin} =
    useForgetPasswordViewModel(navigation);

  return (
    <AuthLayout
      title={Strings.headerTitle.forgetPassword}
      desc1={Strings.headerDescription.dontWorry}
      desc2={Strings.headerDescription.emailLinked}>
      <CustomInput
        icon={Icons.email}
        placeholder={Strings.inputPlaceholder.email}
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <CustomText style={styles.error}>{errors.email}</CustomText>
      )}
      <CustomButton buttonText={Strings.buttons.sendCode} onPress={sendOTP} />

      <FooterText
        text={Strings.texts.rememberPassword}
        coloredText={Strings.texts.logIn}
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
