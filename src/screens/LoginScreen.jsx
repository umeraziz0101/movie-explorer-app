import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/assets/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';

import {auth} from '../utils/firebase/config';
import {signInWithEmailAndPassword} from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPressSignUp = () => {
    navigation.replace(Routes.stack.signUp);
  };
  const onPressForgetPassword = () => {
    navigation.navigate(Routes.stack.forgetPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace(Routes.tabs.home);
    } catch (error) {
      let message = 'Something went wrong.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email!';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email is invalid!';
      }
      Alert.alert('Login Error', message);
    }
  };
  return (
    <AuthLayout
      title={'Login'}
      desc1={'Welcome back! Glad to '}
      desc2={'see you, Again!'}>
      <CustomInput
        icon={'email'}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        icon={'lock'}
        placeholder="Password"
        secure
        iconRight={'passwordShow'}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <View style={styles.row}>
        <CustomText textType="regular" size={14}>
          Remember me
        </CustomText>
        <TouchableOpacity onPress={onPressForgetPassword}>
          <CustomText color={Colors.pink_ff465f} textType="medium" size={14}>
            ForgetPassword?
          </CustomText>
        </TouchableOpacity>
      </View>
      <CustomButton buttonText={'Log in'} onPress={handleLogin} />
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
        onPressColoredText={onPressSignUp}
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
