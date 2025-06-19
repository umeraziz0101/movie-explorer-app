import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomIcon from './CustomIcon';
import Icons from '../utils/assets/Icons';
import CustomImage from './CustomImage';
import Colors from '../utils/constants/Colors';
import {Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import {auth} from '../services/firebaseConfig';
import Images from '../utils/assets/Images';
import Strings from '../utils/constants/Strings';

const DEFAULT_AVATAR = Images.avatar;

const CustomHeader = ({logo, onSignOut}) => {
  const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);

  const navigation = useNavigation();
  useEffect(() => {
    const url = auth.currentUser?.photoURL;
    if (url) setProfileImage(url);
  }, []);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {logo ? (
          <CustomIcon name={Icons.logo} size={50} />
        ) : (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.tabs.root);
              }}>
              <CustomIcon
                name={Icons.back}
                size={35}
                fill={Colors.white_ffffff}
              />
            </TouchableOpacity>
          </View>
        )}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <CustomImage
                imageSize={40}
                imageCircle
                imageSource={profileImage}
              />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              closeMenu();
              onSignOut && onSignOut();
            }}
            title={Strings.buttons.signOut}
          />
        </Menu>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    top: 40,
    width: '90%',
    position: 'absolute',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.gray_d9d9d9,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
