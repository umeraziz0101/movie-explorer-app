import {useState} from 'react';
import {Alert} from 'react-native';
import {
  loginUser,
  signInWithFacebook,
  signInWithGoogle,
} from '../services/firebaseAuth';
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
import Keys from '../utils/constants/Keys';
import {Collections} from '../utils/constants/Firestore';

export function useLoginViewModel(navigation) {
  const [email, setEmail] = useState(Strings.texts.empty);
  const [password, setPassword] = useState(Strings.texts.empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRemember = val => {
    setRememberMe(val);
  };

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
    } else {
      Alert.alert(Strings.errors.error, message);
    }
  };
  const socialSignIn = async method => {
    setLoading(true);
    let result;
    if (method === Keys.socialSignInMethod.google)
      result = await signInWithGoogle();
    else if (method === Keys.socialSignInMethod.facebook)
      result = await signInWithFacebook();
    else if (method === Keys.socialSignInMethod.apple)
      result = await signInWithApple();
    setLoading(false);

    if (!result.success) {
      Alert.alert(Strings.errors.error, result.message);
      return;
    }

    const uid = result.user.uid;
    const userRef = doc(firestore, Collections.users, uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        name: result.user.displayName || Strings.texts.empty,
        email: result.user.email,
        createdAt: serverTimestamp(),
      });
    }

    navigation.replace(Routes.tabs.home);
  };

  const goToSignUp = () => {
    navigation.replace(Routes.stack.signUp);
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
    goToSignUp,
    toggleRemember,
    rememberMe,
  };
}
