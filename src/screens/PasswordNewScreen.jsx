import {Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import Colors from '../utils/constants/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import {confirmPasswordResetWithOTP} from '../services/firebaseAuth';
import {Loader} from '../components/Loader';

const PasswordNewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPwd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill both password fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    const {success, message} = await confirmPasswordResetWithOTP(
      email,
      password,
    );
    setLoading(false);

    if (!success) {
      Alert.alert('Error', message || 'Failed to reset password.');
      return;
    }

    navigation.replace(Routes.stack.passwordChanged);
  };

  return (
    <AuthLayout
      title={'Create New Password'}
      desc1={'Your new password must be unique from those previously used.'}>
      <CustomInput
        icon={'lock'}
        secure
        iconRight={'passwordShow'}
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
      />
      <CustomInput
        icon="lock"
        secure
        iconRight="passwordShow"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPwd}
      />

      <CustomButton buttonText={'Reset Password'} onPress={handleReset} />
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default PasswordNewScreen;

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
