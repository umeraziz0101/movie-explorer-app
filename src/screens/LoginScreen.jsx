import {StyleSheet, View} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/assets/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';

const LoginScreen = () => {
  return (
    <AuthLayout
      title={'Login'}
      desc1={'Welcome back! Glad to '}
      desc2={'see you, Again!'}>
      <CustomInput icon={'email'} />
      <CustomInput icon={'lock'} secure iconRight={'passwordShow'} />
      <View style={styles.row}>
        <CustomText textType="regular" size={14}>
          Remember me
        </CustomText>
        <CustomText color={Colors.pink_ff465f} textType="medium" size={14}>
          ForgetPassword?
        </CustomText>
      </View>
      <CustomButton buttonText={'Log in'} />
      <Divider />
      <CustomButton
        buttonText={'Continue with Google'}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={'google'}
        buttonContainerStyle={styles.socialButton}
      />
      <CustomButton
        buttonText={'Continue with Facebook'}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={'facebook'}
        buttonContainerStyle={styles.socialButton}
      />
      <CustomButton
        buttonText={'Continue with Apple'}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={'apple'}
        buttonContainerStyle={styles.socialButton}
      />
      <FooterText
        text={"Don't have an account"}
        coloredText={'Sign Up'}
        onColoredTextPress={() => {}}
      />
    </AuthLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: Colors.white_fefefe,
    borderColor: Colors.white_fefefe,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
