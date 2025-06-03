import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {auth} from './src/utils/firebase/config';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(usr => {
      setUser(usr);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ff465f" />
      </View>
    );
  }

  return <AppNavigator />;
};

export default App;
