import {Image, StyleSheet} from 'react-native';
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import CustomButton from '../components/CustomButton';
import Colors from '../utils/constants/Colors';
import CustomIcon from '../components/CustomIcon';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';
import Images from '../utils/assets/Images';

const PasswordChangedScreen = () => {
  const navigation = useNavigation();
  const onPressButton = () => {
    navigation.replace(Routes.stack.login);
  };
  return (
    <AuthLayout
      title={Strings.headerTitle.passwordChanged}
      desc1={Strings.headerDescription.passwordChangedSuccessFully}>
      <Image source={Images.badge} style={styles.icon} />
      <CustomButton
        buttonText={Strings.buttons.backToLogin}
        onPress={onPressButton}
      />
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
    width: 120,
    height: 120,
  },
});
