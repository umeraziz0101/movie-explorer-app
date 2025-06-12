import {useState} from 'react';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';
import {validatePasswordUser} from '../utils/inputValidation';

export function usePasswordNewViewModel(navigation, email) {
  const [password, setPassword] = useState(Strings.texts.empty);
  const [confirmPassword, setConfirmPassword] = useState(Strings.texts.empty);
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
