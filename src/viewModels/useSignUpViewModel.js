import {useState} from 'react';
import {Alert} from 'react-native';
import {registerUser} from '../services/firebaseAuth';
import {validateUser} from '../utils/inputValidation';
import Strings from '../utils/constants/Strings';
import Routes from '../utils/constants/Routes';
import {updateProfile} from '@react-native-firebase/auth';
import {auth} from '../services/firebaseConfig';

export function useSignUpViewModel(navigation) {
  const [name, setName] = useState(Strings.texts.empty);
  const [email, setEmail] = useState(Strings.texts.empty);
  const [password, setPassword] = useState(Strings.texts.empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChangeName = text => {
    setName(text);
    if (errors.name) setErrors(e => ({...e, name: null}));
  };

  const onChangeEmail = text => {
    setEmail(text);
    if (errors.email) setErrors(e => ({...e, email: null}));
  };

  const onChangePassword = text => {
    setPassword(text);
    if (errors.password) setErrors(e => ({...e, password: null}));
  };

  const signUp = async () => {
    const data = {};

    const validationErrors = validateUser({name, email, password});
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const {success, message, userData} = await registerUser(
      name,
      email.toLowerCase(),
      password,
    );

    setLoading(false);

    if (success) {
      await updateProfile(auth.currentUser, {displayName: name});
    } else {
      Alert.alert(Strings.errors.error, message);
    }
  };

  const goToLogin = () => {
    navigation.replace(Routes.stack.login);
  };

  return {
    name,
    email,
    password,
    errors,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    signUp,
    goToLogin,
  };
}
