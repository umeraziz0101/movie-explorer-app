import React from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
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
import Fonts from '../utils/constants/Fonts';
import Strings from '../utils/constants/Strings';
import {useNavigation} from '@react-navigation/native';
import Routes from '../utils/constants/Routes';
import NotFound from './NotFound';

const MoviesRowList = ({
  data,
  onEndReached,
  refreshing,
  onRefresh,
  ListHeaderComponent,
  onRemove,
  contentContainerStyle,
  itemStyle,
}) => {
  if (!data || data.length === 0) {
    return <NotFound />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <MoviesRowItem item={item} onRemove={onRemove} itemStyle={itemStyle} />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      nestedScrollEnabled={true}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

const MoviesRowItem = ({item, onRemove, itemStyle}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => setMenuVisible(v => !v);

  const handleRemove = () => {
    toggleMenu();
    Alert.alert(
      Strings.alerts.title.removeMovie,
      Strings.alerts.message.areYouWantToRemoveMovie,
      [
        {text: Strings.buttons.no, style: 'cancel'},
        {
          text: Strings.buttons.yes,
          style: 'destructive',
          onPress: () => onRemove(item.id),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={itemStyle}>
      <Pressable
        onPress={() => {
          navigation.navigate(Routes.stack.detail, {data: item});
        }}>
        <View style={styles.itemRowContainer}>
          <ImageBackground
            source={{uri: item.poster_path}}
            style={styles.image}
            resizeMode="cover">
            {onRemove && (
              <>
                <LinearGradient
                  colors={[Colors.opacity_dark, Colors.opacity_dark]}
                  style={styles.gradient}
                />
                <View style={styles.playOverlay}>
                  <CustomIcon name={Icons.play} size={24} />
                </View>
              </>
            )}
          </ImageBackground>

          <View style={styles.textContainer}>
            <CustomText textType={Fonts.semiBold} size={14}>
              {item.title}
            </CustomText>
            <CustomText size={12} color={Colors.gray_969696}>
              {new Date(item.release_date).getFullYear()}
            </CustomText>
          </View>
          {onRemove ? (
            <View style={styles.menuContainer}>
              <Menu
                visible={menuVisible}
                onDismiss={toggleMenu}
                anchor={
                  <TouchableOpacity onPress={toggleMenu}>
                    <CustomIcon name={Icons.more} size={24} />
                  </TouchableOpacity>
                }>
                <Menu.Item
                  onPress={handleRemove}
                  title={Strings.buttons.remove}
                />
              </Menu>
            </View>
          ) : (
            <View style={styles.iconRightContainer}>
              <View style={styles.playOverlay}>
                <CustomIcon name={Icons.play} size={20} />
              </View>
            </View>
          )}
        </View>
        <Divider style={{backgroundColor: Colors.gray_393939}} />
      </Pressable>
    </View>
  );
};

export default MoviesRowList;

const styles = StyleSheet.create({
  itemRowContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 70,
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
  textContainer: {flex: 1},
  menuContainer: {marginLeft: 12},
  iconRightContainer: {
    width: 42,
    height: 42,
    borderColor: Colors.pink_ff465f,
    borderRadius: 4,
    borderWidth: 2,
  },
});
