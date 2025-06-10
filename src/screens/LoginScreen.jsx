import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';
import Routes from '../utils/constants/Routes';

// import Keys from '../utils/constants/Keys';
// import {validateLoginUser} from '../utils/inputValidation';
// import Strings from '../utils/constants/Strings';
import {Loader} from '../components/Loader';
// import {loginUser} from '../services/firebaseAuth';
import {useLoginViewModel} from '../viewModels/useLoginViewModel';

const LoginScreen = ({navigation}) => {
  const {
    email,
    password,
    errors,
    loading,
    onChangeEmail,
    onChangePassword,
    login,
    socialSignIn,
  } = useLoginViewModel(navigation);

  return (
    <AuthLayout
      title={'Login'}
      desc1={'Welcome back! Glad to '}
      desc2={'see you, Again!'}>
      <CustomInput
        icon={'email'}
        placeholder="Email"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <CustomText style={styles.error}>{errors.email}</CustomText>
      )}
      <CustomInput
        icon={'lock'}
        placeholder="Password"
        secure
        iconRight={'passwordShow'}
        value={password}
        onChangeText={onChangePassword}
        autoCapitalize="none"
      />
      {errors.password && (
        <CustomText style={styles.error}>{errors.password}</CustomText>
      )}
      <View style={styles.row}>
        <CustomText textType="regular" size={14}>
          Remember me
        </CustomText>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.stack.forgetPassword)}>
          <CustomText color={Colors.pink_ff465f} textType="medium" size={14}>
            ForgetPassword?
          </CustomText>
        </TouchableOpacity>
      </View>
      <CustomButton buttonText={'Log in'} onPress={login} />
      <Divider />
      <CustomButton
        buttonText={'Continue with Google'}
        buttonTextSize={14}
        buttonTextType={'regular'}
        leftIcon={'google'}
        buttonContainerStyle={styles.socialButton}
        onPress={() => socialSignIn('google')}
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
        onPressColoredText={() => navigation.replace(Routes.stack.signUp)}
      />
      <Loader visible={loading} />
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
  error: {
    color: Colors.red_f5615d,
    marginBottom: 8,
  },
});
