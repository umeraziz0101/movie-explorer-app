import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';
import Icons from '../utils/assets/Icons';
import Colors from '../utils/constants/Colors';
import Strings from '../utils/constants/Strings';
import Fonts from '../utils/constants/Fonts';

const MoviesRowList = ({data, onEndReached}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <MoviesRowItem item={item} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const MoviesRowItem = ({item}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => setMenuVisible(v => !v);

  return (
    <View>
      <View style={styles.itemRowContainer}>
        <ImageBackground
          source={{uri: item.poster_path}}
          style={styles.image}
          resizeMode="cover">
          <LinearGradient
            colors={[Colors.opacity_dark, Colors.opacity_dark]}
            style={styles.gradient}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
          />
          <View style={styles.playOverlay}>
            <CustomIcon name={Icons.play} size={24} />
          </View>
        </ImageBackground>
        <View style={styles.textContainer}>
          <CustomText textType={Fonts.semiBold} size={14}>
            {item.original_title}
          </CustomText>
          <CustomText
            textType={Fonts.medium}
            size={12}
            color={Colors.gray_969696}>
            {new Date(item.release_date).getFullYear()}
          </CustomText>
        </View>
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={toggleMenu}
            anchor={
              <TouchableOpacity onPress={toggleMenu}>
                <CustomIcon name={Icons.more} size={24} />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => {}} title={'Delete'} />
          </Menu>
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default MoviesRowList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  itemRowContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 70,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  menuContainer: {
    marginLeft: 12,
  },
});
