import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/assets/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';
import Routes from '../utils/constants/Routes';
import {useNavigation} from '@react-navigation/native';

import {auth} from '../utils/firebase/config';
import {createUserWithEmailAndPassword} from '@react-native-firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPressLogin = () => {
    navigation.replace(Routes.stack.login);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace(Routes.tabs.home);
    } catch (error) {
      let message = 'Something went wrong.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'That email address is invalid!';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters!';
      }
      Alert.alert('Sign Up Error', message);
    }
  };
  return (
    <AuthLayout
      title={'Sign Up'}
      desc1={'Hello! Sign Up to get '}
      desc2={'started'}>
      {/* <CustomInput icon={'user'} /> */}

      <CustomInput
        icon={'email'}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        icon={'lock'}
        placeholder="Password"
        secure
        iconRight={'passwordShow'}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <CustomButton buttonText={'Sign up'} onPress={handleSignUp} />

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
        onPressColoredText={onPressLogin}
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
  },
});
