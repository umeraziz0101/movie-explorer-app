import {useState} from 'react';
import {Alert} from 'react-native';
import {loginUser, signInWithGoogle} from '../services/firebaseAuth';
import {validateLoginUser} from '../utils/inputValidation';
import Strings from '../utils/constants/Strings';
import Routes from '../utils/constants/Routes';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore';
import {firestore} from '../services/firebaseConfig';

export function useLoginViewModel(navigation) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChangeEmail = text => {
    setEmail(text);
    if (errors.email) setErrors(e => ({...e, email: null}));
  };

  const onChangePassword = text => {
    setPassword(text);
    if (errors.password) setErrors(e => ({...e, password: null}));
  };

  const login = async () => {
    const validationErrors = validateLoginUser({email, password});
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const {success, message} = await loginUser(email.toLowerCase(), password);
    setLoading(false);

    if (success) {
      // navigation.replace(Routes.tabs.home);
    } else {
      Alert.alert(Strings.errors.error, message);
    }
  };
  const socialSignIn = async method => {
    setLoading(true);
    let result;
    if (method === 'google') result = await signInWithGoogle();
    else if (method === 'facebook') result = await signInWithFacebook();
    else if (method === 'apple') result = await signInWithApple();
    setLoading(false);

    if (!result.success) {
      Alert.alert(Strings.errors.error, result.message);
      return;
    }

    const uid = result.user.uid;
    const userRef = doc(firestore, 'users', uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        name: result.user.displayName || '',
        email: result.user.email,
        createdAt: serverTimestamp(),
      });
    }

    navigation.replace(Routes.tabs.home);
  };

  return {
    email,
    password,
    errors,
    loading,
    onChangeEmail,
    onChangePassword,
    login,
    socialSignIn,
  };
}
