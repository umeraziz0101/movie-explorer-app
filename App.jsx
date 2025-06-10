import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '404137427662-pfmit2e83dljefahj8omdhd8eugki6n2.apps.googleusercontent.com', // from Firebase Console → Project Settings → OAuth 2.0 Client IDs
      offlineAccess: false,
    });
  }, []);

  return <AppNavigator />;
};

export default App;
