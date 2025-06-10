import {useState} from 'react';
import {Alert} from 'react-native';
import {requestPasswordReset} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';
import {validateEmailUser} from '../utils/inputValidation';

export function useForgetPasswordViewModel(navigation) {
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChangeEmail = text => {
    setEmail(text);
    if (errors.email) setErrors(e => ({...e, email: null}));
  };

  const sendOTP = async () => {
    const validationErrors = validateEmailUser({email});
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const {success, message} = await requestPasswordReset(
      email.toLocaleLowerCase().trim(),
    );
    setLoading(false);

    if (success) {
      navigation.navigate(Routes.stack.otpVerification, {email: email.trim()});
    } else {
      Alert.alert(
        Strings.errors.error,
        message || 'Failed to request password reset.',
      );
    }
  };

  const goToLogin = () => {
    navigation.replace(Routes.stack.login);
  };

  return {
    email,
    errors,
    loading,
    onChangeEmail,
    sendOTP,
    goToLogin,
  };
}
