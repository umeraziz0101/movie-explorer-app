import {getApp, initializeApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import {getFunctions} from '@react-native-firebase/functions';
import Keys from '../utils/constants/Keys';

const firebaseConfig = {
  apiKey: Keys.firebase.apiKey,
  authDomain: Keys.firebase.AuthDomain,
  projectId: Keys.firebase.projectId,
  storageBucket: Keys.firebase.storageBucket,
  messagingSenderId: Keys.firebase.messageSenderId,
  appId: Keys.firebase.appId,
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
