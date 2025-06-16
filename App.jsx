import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import Keys from './src/utils/constants/Keys';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Keys.google.webClientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      scopes: [Keys.google.scope.profile, Keys.google.scope.email],
    });

    Settings.setAppID(Keys.facebook.appId);
    Settings.initializeSDK();
  }, []);

  return <AppNavigator />;
};

export default App;
