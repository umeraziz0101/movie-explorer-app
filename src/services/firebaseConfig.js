import {getApp, initializeApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import {getFunctions} from '@react-native-firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyD3jf0stAawpHyXBvZussdHHeHXNXSWcBI',
  authDomain: 'movies-app-47aae.firebaseapp.com',
  projectId: 'movies-app-47aae',
  storageBucket: 'movies-app-47aae.firebasestorage.app',
  messagingSenderId: '404137427662',
  appId: '1:404137427662:web:ca90a7b8b203769a61469f',
};

let firebaseApp;
try {
  firebaseApp = getApp();
} catch {
  firebaseApp = initializeApp(firebaseConfig);
}

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

export {firebaseApp, auth, firestore, functions};
