import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomIcon from './CustomIcon';
import Icons from '../utils/assets/Icons';
import CustomImage from './CustomImage';
import Colors from '../utils/constants/Colors';
import {Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../services/firebaseConfig';
import Images from '../utils/assets/Images';
import Strings from '../utils/constants/Strings';
import CustomText from './CustomText';

import Fonts from '../utils/constants/Fonts';

const DEFAULT_AVATAR = Images.avatar;

const CustomHeader = ({logo, onSignOut, isFavorite, toggleFavorite}) => {
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
                navigation.goBack();
              }}>
              <CustomIcon name={Icons.back} size={35} />
            </TouchableOpacity>
          </View>
        )}
        {!logo && (
          <TouchableOpacity
            onPress={toggleFavorite}
            style={styles.favoriteButton}>
            <CustomIcon
              name={isFavorite ? Icons.heartFillLight : Icons.heartLight}
              size={24}
            />
          </TouchableOpacity>
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
  favoriteButton: {marginLeft: 'auto', marginRight: 20},
});

export const SolidHeader = ({
  iconBack,
  search,
  title,
  iconFavorite,
  iconSearch,
  iconMic,
  searchValue,
  onSearchChange,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles1.container}>
      <View style={styles1.row}>
        {iconBack && (
          <View style={styles1.iconBackContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <CustomIcon name={Icons.backLight} size={24} />
            </TouchableOpacity>
          </View>
        )}
        {iconSearch && (
          <View style={styles1.iconBackContainer}>
            <CustomIcon name={Icons.SearchLight} size={24} />
          </View>
        )}
        {search && (
          <View style={styles1.inputContainer}>
            <TextInput
              style={[styles1.input]}
              placeholderTextColor={Colors.white_fefefe}
              placeholder={Strings.inputPlaceholder.search}
              onChangeText={onSearchChange}
              value={searchValue}
            />
            {searchValue && (
              <TouchableOpacity
                onPress={() => {
                  onSearchChange(Strings.texts.empty);
                }}>
                <CustomIcon
                  name={Icons.cross}
                  size={24}
                  style={styles1.iconCross}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {title && <CustomText>{title}</CustomText>}
        <View>
          {iconFavorite && (
            <CustomIcon
              name={Icons.heartFillLight}
              size={24}
              style={styles1.iconFavorite}
            />
          )}
          {iconMic && (
            <CustomIcon name={Icons.mic} size={24} style={styles1.iconMic} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    top: 40,
    width: '90%',
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.gray_535353,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCross: {marginHorizontal: 12},
  iconFavorite: {marginLeft: 'auto'},
  iconMic: {marginLeft: 'auto'},
  inputContainer: {
    padding: 0,
    marginRight: 'auto',
    marginLeft: 12,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    padding: 0,
    margin: 0,
    fontSize: 12,
    fontFamily: Fonts.regular,
    flex: 1,
    color: Colors.white_fefefe,
  },
});
