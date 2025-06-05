import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {auth} from './src/services/firebaseConfig';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return <AppNavigator />;
};

export default App;
