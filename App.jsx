import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import Keys from './src/utils/constants/Keys';
import {PaperProvider} from 'react-native-paper';
import StackNavigator from './src/navigation/StackNavigator';

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
      <StackNavigator />
    </PaperProvider>
  );
};

export default App;
