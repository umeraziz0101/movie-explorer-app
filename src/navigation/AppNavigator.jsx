import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import Routes from '../utils/constants/Routes';
import OnBoardScreen from '../screens/OnBoardScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import PasswordNewScreen from '../screens/PasswordNewScreen';
import PasswordChangedScreen from '../screens/PasswordChangedScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.splash}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.stack.splash} component={SplashScreen} />
        <Stack.Screen name={Routes.stack.onBoard} component={OnBoardScreen} />
        <Stack.Screen name={Routes.stack.login} component={LoginScreen} />
        <Stack.Screen name={Routes.stack.signUp} component={SignUpScreen} />
        <Stack.Screen
          name={Routes.stack.forgetPassword}
          component={ForgetPasswordScreen}
        />
        <Stack.Screen
          name={Routes.stack.otpVerification}
          component={OTPVerificationScreen}
        />
        <Stack.Screen
          name={Routes.stack.passwordNew}
          component={PasswordNewScreen}
        />
        <Stack.Screen
          name={Routes.stack.passwordChanged}
          component={PasswordChangedScreen}
        />
        <Stack.Screen name={Routes.tabs.home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
