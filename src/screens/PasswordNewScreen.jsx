import {StyleSheet} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import Colors from '../utils/constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';

const PasswordNewScreen = () => {
  const navigation = useNavigation();
  const onPressButton = () => {
    navigation.navigate(Routes.stack.passwordChanged);
  };
  return (
    <AuthLayout
      title={'Create New Password'}
      desc1={'Your new password must be unique from those previously used.'}>
      <CustomInput icon={'lock'} secure iconRight={'passwordShow'} />
      <CustomInput icon={'lock'} secure iconRight={'passwordShow'} />

      <CustomButton buttonText={'Reset Password'} onPress={onPressButton} />
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
