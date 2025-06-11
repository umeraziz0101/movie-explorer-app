import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '404137427662-pfmit2e83dljefahj8omdhd8eugki6n2.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      scopes: ['profile', 'email'],
    });

    Settings.setAppID('3703593636606065');
    Settings.initializeSDK();

    console.log('Facebook SDK initialized');
  }, []);

  return <AppNavigator />;
};

export default App;
