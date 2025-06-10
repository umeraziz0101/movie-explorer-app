import {StyleSheet} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import Colors from '../utils/constants/Colors';
import {useRoute} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {usePasswordNewViewModel} from '../viewModels/usePasswordNewViewModel';
import CustomText from '../components/CustomText';

const PasswordNewScreen = ({navigation}) => {
  const {email} = useRoute().params;
  const {
    password,
    confirmPassword,
    errors,
    loading,
    onChangePassword,
    onChangeConfirmPassword,
    resetPassword,
  } = usePasswordNewViewModel(navigation, email);

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
        onChangeText={onChangePassword}
      />
      {errors.password && (
        <CustomText style={styles.error}>{errors.password}</CustomText>
      )}
      <CustomInput
        icon="lock"
        secure
        iconRight="passwordShow"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
      />
      {errors.confirmPassword && (
        <CustomText style={styles.error}>{errors.confirmPassword}</CustomText>
      )}
      <CustomButton buttonText={'Reset Password'} onPress={resetPassword} />
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
  error: {
    color: Colors.red_f5615d,
    marginBottom: 8,
  },
});
