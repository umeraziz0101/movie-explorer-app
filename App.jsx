import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen';
import Wrapper from './src/components/Wrapper';
import AuthLayout from './src/components/AuthLayout';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import PasswordNewScreen from './src/screens/PasswordNewScreen';
import PasswordChangedScreen from './src/screens/PasswordChangedScreen';

const App = () => {
  return <OTPVerificationScreen />;
};

export default App;

const styles = StyleSheet.create({});
