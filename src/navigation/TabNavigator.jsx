import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Routes from '../utils/constants/Routes';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SearchScreen from '../screens/SearchScreen';
import GenreScreen from '../screens/GenreScreen';
import Colors from '../utils/constants/Colors';
import Icons from '../utils/assets/Icons';
import CustomIcon from '../components/CustomIcon';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {width} = useWindowDimensions();
  const semicircleDiameter = ((width * 0.92) / 4) * 0.2;

  return (
    <Tab.Navigator
      initialRouteName={Routes.tabs.home}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBarContainer,
          {
            marginHorizontal: width * 0.04,
          },
        ],

        tabBarIconStyle: styles.iconStyle,
        tabBarIcon: ({focused, size}) => {
          let IconComponent;

          switch (route.name) {
            case Routes.tabs.home:
              IconComponent = focused ? Icons.HomeFill : Icons.home;
              break;
            case Routes.tabs.favorites:
              IconComponent = focused ? Icons.heartFill : Icons.heart;
              break;
            case Routes.tabs.search:
              IconComponent = focused ? Icons.searchFill : Icons.search;
              break;
            case Routes.tabs.genres:
              IconComponent = focused ? Icons.genreFill : Icons.genre;
              break;
            default:
              IconComponent = Icons.home;
          }

          return (
            <View style={styles.iconContainer}>
              <CustomIcon name={IconComponent} size={size} />
              {focused && (
                <View
                  style={[
                    styles.semiCircle,
                    {
                      bottom: -semicircleDiameter,
                      width: semicircleDiameter,
                      height: semicircleDiameter / 2,
                      borderTopLeftRadius: semicircleDiameter / 2,
                      borderTopRightRadius: semicircleDiameter / 2,
                    },
                  ]}
                />
              )}
            </View>
          );
        },
      })}>
      <Tab.Screen name={Routes.tabs.home} component={HomeScreen} />
      <Tab.Screen name={Routes.tabs.favorites} component={FavoriteScreen} />
      <Tab.Screen name={Routes.tabs.search} component={SearchScreen} />
      <Tab.Screen name={Routes.tabs.genres} component={GenreScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 40,
    width: '92%',
    elevation: 0,
    backgroundColor: Colors.pink_ff465f,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    borderRadius: 15,
    height: 60,
  },
  iconStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  semiCircle: {
    position: 'absolute',
    backgroundColor: Colors.black_0d0d0d,
  },
});
