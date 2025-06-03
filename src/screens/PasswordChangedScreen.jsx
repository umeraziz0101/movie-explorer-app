import {StyleSheet} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomButton from '../components/CustomButton';
import Colors from '../utils/assets/Colors';
import CustomIcon from '../components/CustomIcon';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';

const PasswordChangedScreen = () => {
  const navigation = useNavigation();
  const onPressButton = () => {
    navigation.replace(Routes.stack.login);
  };
  return (
    <AuthLayout
      title={'Password Changed'}
      desc1={'Your Password has been changed successfully'}>
      <CustomIcon name={'badge11'} size={120} style={styles.icon} />
      <CustomButton buttonText={'Back to Login'} onPress={onPressButton} />
    </AuthLayout>
  );
};

export default PasswordChangedScreen;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: Colors.white_fefefe,
    borderColor: Colors.white_fefefe,
    paddingVertical: 8,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
