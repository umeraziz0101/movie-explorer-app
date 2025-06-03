import {Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/assets/Colors';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import {auth} from '../utils/firebase/config';
import {sendPasswordResetEmail} from '@react-native-firebase/auth';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const onPressLogin = () => {
    navigation.replace(Routes.stack.login);
  };

  const onPressButton = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert('Success', 'Password reset email sent! Check your inbox.');
      navigation.replace(Routes.stack.login);
    } catch (error) {
      let message = 'Something went wrong.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with that email!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email is invalid!';
      }
      Alert.alert('Reset Error', message);
    }
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
      <CustomButton buttonText={'Send Code'} onPress={onPressButton} />

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
