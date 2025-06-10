import {Alert, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput, {CustomInputBox} from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import {Loader} from '../components/Loader';
import {verifyPasswordResetOTP} from '../services/firebaseAuth';
import {useOTPVerificationViewModel} from '../viewModels/useOTPVerificationViewModel';

const OTPVerificationScreen = () => {
  const navigation = useNavigation();
  const {email} = useRoute().params;
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const {otp, loading, onChangeOtp, verify, goToLogin} =
    useOTPVerificationViewModel(navigation, email);
  return (
    <AuthLayout
      title={'OTP Verification'}
      desc1={'Enter the verification code we just '}
      desc2={'sent on your email'}>
      <View style={styles.row}>
        {otp.map((digit, idx) => (
          <CustomInputBox
            key={idx}
            ref={refs[idx]}
            nextRef={refs[idx + 1]}
            prevRef={refs[idx - 1]}
            value={digit}
            onChangeText={val =>
              onChangeOtp(idx, val, refs[idx + 1], refs[idx - 1])
            }
          />
        ))}
      </View>
      <CustomButton buttonText={'Verify'} onPress={verify} />

      <FooterText
        text={'Didn’t Received Code?'}
        coloredText={'Log In'}
        onPressColoredText={goToLogin}
      />
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: Colors.white_fefefe,
    borderColor: Colors.white_fefefe,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 16,
  },
});
