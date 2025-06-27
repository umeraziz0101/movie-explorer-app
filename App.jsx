import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import Keys from './src/utils/constants/Keys';
import {PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider, useDispatch} from 'react-redux';
import {store} from './src/redux/store';
import storage from './src/services/storage';
import {loadFavorites} from './src/redux/favoritesSlice';
import StackNavigator from './src/navigation/StackNavigator';

function Root() {
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Keys.google.webClientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      scopes: [Keys.google.scope.profile, Keys.google.scope.email],
    });
    Settings.setAppID(Keys.facebook.appId);
    Settings.initializeSDK();

    storage.getFavorites().then(list => {
      dispatch(loadFavorites(list));
    });
  }, [dispatch]);

  return <StackNavigator />;
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Root />
      </PaperProvider>
    </ReduxProvider>
  );
}
