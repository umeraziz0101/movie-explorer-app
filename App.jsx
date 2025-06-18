import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/TabNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import Keys from './src/utils/constants/Keys';
import {PaperProvider} from 'react-native-paper';
import StackNavigator from './src/navigation/StackNavigator';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

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

  return (
    <PaperProvider>
      {/* <AppNavigator /> */}
      <StackNavigator />
    </PaperProvider>
  );
};

export default App;
