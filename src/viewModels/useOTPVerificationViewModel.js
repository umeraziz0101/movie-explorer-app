import {useState} from 'react';
import {Alert} from 'react-native';
import {verifyPasswordResetOTP} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';

export function useOTPVerificationViewModel(navigation, email) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const onChangeOtp = (index, value, nextRef, prevRef) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && nextRef?.current) nextRef.current.focus();
    if (!value && prevRef?.current) prevRef.current.focus();
  };

  const verify = async () => {
    const code = otp.join('');
    if (code.length !== 4) {
      Alert.alert(Strings.errors.errorTitle, 'Please enter all 4 digits.');
      return;
    }
    setLoading(true);
    const {success, message} = await verifyPasswordResetOTP(email, code);
    setLoading(false);
    if (success) {
      navigation.navigate(Routes.stack.passwordNew, {email});
    } else {
      Alert.alert(Strings.errors.error, message || 'OTP verification failed.');
    }
  };

  const goToLogin = () => {
    navigation.replace(Routes.stack.login);
  };

  return {
    otp,
    loading,
    onChangeOtp,
    verify,
    goToLogin,
  };
}
