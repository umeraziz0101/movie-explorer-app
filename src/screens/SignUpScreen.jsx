import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FooterText from '../components/FooterText';
import Colors from '../utils/constants/Colors';
import Divider from '../components/Divider';
import CustomText from '../components/CustomText';
import Routes from '../utils/constants/Routes';
import {useNavigation} from '@react-navigation/native';
import Keys from '../utils/constants/Keys';
import {validateUser} from '../utils/inputValidation';
import {registerUser} from '../services/firebaseAuth';
import Strings from '../utils/constants/Strings';
import {Loader} from '../components/Loader';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const onPressLogin = () => {
    navigation.replace(Routes.stack.login);
  };

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    if (field === Keys.input.name) setUser({...user, name: value});
    if (field === Keys.input.email) setUser({...user, email: value});
    if (field === Keys.input.password) setUser({...user, password: value});
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  const handleSignUp = async () => {
    const newErrors = validateUser(user);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const result = await registerUser(user.name, user.email, user.password);
      setLoading(false);
      if (result.success) {
        navigation.navigate(Routes.tabs.home);
      } else {
        Alert.alert(Strings.errors.error, result.message);
      }
    }
  };
  return (
    <AuthLayout
      title={'Sign Up'}
      desc1={'Hello! Sign Up to get '}
      desc2={'started'}>
      <CustomInput
        icon={'user'}
        placeholder="Name"
        value={user.name}
        onChangeText={text => {
          handleChange(Keys.input.name, text);
        }}
      />
      {errors.name && (
        <CustomText style={styles.error}>{errors.name}</CustomText>
      )}
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
      <CustomButton buttonText={'Sign up'} onPress={handleSignUp} />

      <Divider colored />
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
        text={'Already have an account?'}
        coloredText={'Log In'}
        onPressColoredText={onPressLogin}
      />
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: Colors.white_fefefe,
    borderColor: Colors.white_fefefe,
    paddingVertical: 8,
  },
  error: {
    color: Colors.red_f5615d,
    marginBottom: 8,
  },
});
