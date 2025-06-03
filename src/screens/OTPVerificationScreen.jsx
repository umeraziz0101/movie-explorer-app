import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput, {CustomInputBox} from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/assets/Colors';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';

const OTPVerificationScreen = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const navigation = useNavigation();
  const onPressLogin = () => {
    navigation.replace(Routes.stack.login);
  };
  const onPressButton = () => {
    navigation.navigate(Routes.stack.passwordNew);
  };
  return (
    <AuthLayout
      title={'OTP Verification'}
      desc1={'Enter the verification code we just '}
      desc2={'sent on your email'}>
      <View style={styles.row}>
        <CustomInputBox ref={ref1} nextRef={ref2} prevRef={null} />

        <CustomInputBox ref={ref2} nextRef={ref3} prevRef={ref1} />

        <CustomInputBox ref={ref3} nextRef={ref4} prevRef={ref2} />

        <CustomInputBox ref={ref4} nextRef={null} prevRef={ref3} />
      </View>
      <CustomButton buttonText={'Verify'} onPress={onPressButton} />

      <FooterText
        text={'Didn’t Received Code?'}
        coloredText={'Log In'}
        onPressColoredText={onPressLogin}
      />
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
