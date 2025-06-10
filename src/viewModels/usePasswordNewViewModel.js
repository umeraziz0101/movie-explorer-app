import {useState} from 'react';
import {Alert} from 'react-native';
import {confirmPasswordResetWithOTP} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';
import {validatePasswordUser} from '../utils/inputValidation';

export function usePasswordNewViewModel(navigation, email) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const onChangePassword = text => {
    setPassword(text);
    if (errors.password) setErrors(e => ({...e, password: null}));
  };

  const onChangeConfirmPassword = text => {
    setConfirmPassword(text);
    if (errors.confirmPassword) setErrors(e => ({...e, confirmPassword: null}));
  };

  const resetPassword = async () => {
    const validationErrors = validatePasswordUser({password, confirmPassword});
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    navigation.replace(Routes.stack.passwordChanged);

    // setLoading(true);
    // const {success, message} = await confirmPasswordResetWithOTP(
    //   email,
    //   password,
    // );
    // setLoading(false);

    // if (success) {
    //   navigation.replace(Routes.stack.passwordChanged);
    // } else {
    //   Alert.alert(Strings.errors.error, message || 'Failed to reset password.');
    // }
  };

  return {
    password,
    confirmPassword,
    loading,
    errors,
    onChangePassword,
    onChangeConfirmPassword,
    resetPassword,
  };
}
