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

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    const {success, code, message} = await requestPasswordReset(email.trim());
    if (!success) {
      Alert.alert('Error', message || 'Failed to request password reset.');
      return;
    }

    navigation.navigate(Routes.stack.otpVerification, {email});
  };
  const onPressLogin = () => {
    navigation.replace(Routes.stack.login);
  };

  return (
    <AuthLayout
      title={'Forget Password'}
      desc1={"Don't worry! Please enter the"}
      desc2={'email linked with your account.'}>
      <CustomInput
        icon={'email'}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomButton buttonText={'Send Code'} onPress={handleSendOTP} />

      <FooterText
        text={'Remember Password?'}
        coloredText={'Log In'}
        onPressColoredText={onPressLogin}
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
