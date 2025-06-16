import {useState} from 'react';
import {Alert} from 'react-native';
import {verifyPasswordResetOTP} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';

export function useOTPVerificationViewModel(navigation, email) {
  const [otp, setOtp] = useState([
    Strings.texts.empty,
    Strings.texts.empty,
    Strings.texts.empty,
    Strings.texts.empty,
  ]);
  const [loading, setLoading] = useState(false);

  const onChangeOtp = (index, value, nextRef, prevRef) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && nextRef?.current) nextRef.current.focus();
    if (!value && prevRef?.current) prevRef.current.focus();
  };

  const verify = async () => {
    const code = otp.join(Strings.texts.empty);
    if (code.length !== 4) {
      Alert.alert(Strings.errors.errorTitle, Strings.errors.otpEnterAllDigits);
      return;
    }
    setLoading(true);
    const {success, message} = await verifyPasswordResetOTP(email, code);
    setLoading(false);
    if (success) {
      navigation.navigate(Routes.stack.passwordNew, {email});
    } else {
      Alert.alert(
        Strings.errors.error,
        message || Strings.errors.otpVerificationFailed,
      );
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
