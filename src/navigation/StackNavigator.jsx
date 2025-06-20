import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {auth} from '../services/firebaseConfig';
import Constants from '../utils/constants/Constants';
import Routes from '../utils/constants/Routes';
import SplashScreen from '../screens/SplashScreen';
import OnBoardScreen from '../screens/OnBoardScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import PasswordNewScreen from '../screens/PasswordNewScreen';
import PasswordChangedScreen from '../screens/PasswordChangedScreen';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(Routes.stack.splash);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setTimeout(
          () => setInitialRoute(Routes.tabs.home),
          Constants.fetchTimeOut,
        );
      } else {
        setInitialRoute(Routes.stack.onBoard);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
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
        <Stack.Screen name={Routes.tabs.root} component={TabNavigator} />
        <Stack.Screen name={Routes.stack.detail} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
