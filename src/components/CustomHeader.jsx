import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomIcon from './CustomIcon';
import Icons from '../utils/assets/Icons';
import CustomImage from './CustomImage';
import Images from '../utils/assets/Images';
import Colors from '../utils/constants/Colors';
import {Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import {auth} from '../services/firebaseConfig';

const CustomHeader = ({logo, onSignOut}) => {
  const currentUser = auth.currentUser.photoURL;
  const navigation = useNavigation();
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
                // local
                imageSize={40}
                imageCircle
                // imageSource={Images.fastX }
                imageSource={currentUser}
              />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              closeMenu();
              onSignOut && onSignOut();
            }}
            title="Sign Out"
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
    // backgroundColor: '#aa3',
    // paddingHorizontal: 16,
    // marginHorizontal: 16,
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
