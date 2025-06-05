import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';

import Keys from '../utils/constants/Keys';
import {validateLoginUser} from '../utils/inputValidation';
import Strings from '../utils/constants/Strings';
import {Loader} from '../components/Loader';
import {loginUser} from '../services/firebaseAuth';

const LoginScreen = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    if (field === Keys.input.email) setUser({...user, email: value});
    if (field === Keys.input.password) setUser({...user, password: value});
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  const handleLogin = async () => {
    const newErrors = validateLoginUser(user);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      const result = await loginUser(user.email, user.password);
      setLoading(false);
      if (result.success) {
        navigation.replace(Routes.tabs.home);
      } else {
        Alert.alert(Strings.errors.error, result.message);
      }
    }
  };

  const navigation = useNavigation();
  const onPressSignUp = () => {
    navigation.replace(Routes.stack.signUp);
  };
  const onPressForgetPassword = () => {
    navigation.navigate(Routes.stack.forgetPassword);
  };

  return (
    <AuthLayout
      title={'Login'}
      desc1={'Welcome back! Glad to '}
      desc2={'see you, Again!'}>
      <CustomInput
        icon={'email'}
        placeholder="Email"
        value={user.email}
        onChangeText={text => {
          handleChange(Keys.input.email, text);
        }}
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
        value={user.password}
        onChangeText={text => {
          handleChange(Keys.input.password, text);
        }}
        autoCapitalize="none"
      />
      {errors.password && (
        <CustomText style={styles.error}>{errors.password}</CustomText>
      )}
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
