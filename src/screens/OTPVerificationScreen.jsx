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

const OTPVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;

  const ref1 = useRef(null),
    ref2 = useRef(null),
    ref3 = useRef(null),
    ref4 = useRef(null);

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const code = `${otp1}${otp2}${otp3}${otp4}`;
    if (code.length !== 4) {
      Alert.alert('Error', 'Please enter all 4 digits.');
      return;
    }

    setLoading(true);
    const {success, message} = await verifyPasswordResetOTP(email, code);
    setLoading(false);

    if (!success) {
      Alert.alert('Error', message || 'OTP verification failed.');
      return;
    }

    navigation.navigate(Routes.stack.passwordNew, {email});
  };

  const onPressLogin = () => {
    navigation.replace(Routes.stack.login);
  };
  return (
    <AuthLayout
      title={'OTP Verification'}
      desc1={'Enter the verification code we just '}
      desc2={'sent on your email'}>
      <View style={styles.row}>
        <CustomInputBox
          ref={ref1}
          nextRef={ref2}
          prevRef={null}
          value={otp1}
          onChangeText={val => setOtp1(val)}
        />

        <CustomInputBox
          ref={ref2}
          nextRef={ref3}
          prevRef={ref1}
          value={otp2}
          onChangeText={val => setOtp2(val)}
        />

        <CustomInputBox
          ref={ref3}
          nextRef={ref4}
          prevRef={ref2}
          value={otp3}
          onChangeText={val => setOtp3(val)}
        />

        <CustomInputBox
          ref={ref4}
          nextRef={null}
          prevRef={ref3}
          value={otp4}
          onChangeText={val => setOtp4(val)}
        />
      </View>
      <CustomButton buttonText={'Verify'} onPress={handleVerify} />

      <FooterText
        text={'Didn’t Received Code?'}
        coloredText={'Log In'}
        onPressColoredText={onPressLogin}
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
