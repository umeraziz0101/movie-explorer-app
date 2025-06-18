import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Routes from '../utils/constants/Routes';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SearchScreen from '../screens/SearchScreen';
import GenreScreen from '../screens/GenreScreen';
import Colors from '../utils/constants/Colors';
import Icons from '../utils/assets/Icons';
import CustomIcon from '../components/CustomIcon';
import {useWindowDimensions} from 'react-native';

const Tab = createBottomTabNavigator();

// Custom Tab Button Component
function CustomTabButton({children, onPress, accessibilityState}) {
  const focused = accessibilityState?.selected || false;
  const {width} = useWindowDimensions();
  const tabWidth = (width * 0.92) / 4; // 4 tabs, 92% width total

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
      {/* Half Circle for Active Tab */}
      {focused && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: tabWidth * 0.6, // Adjust size as needed
            height: (tabWidth * 0.6) / 2, // Half of width for semicircle
            backgroundColor: 'black',
            borderTopLeftRadius: (tabWidth * 0.6) / 2,
            borderTopRightRadius: (tabWidth * 0.6) / 2,
            zIndex: 1,
          }}
        />
      )}
      <View style={{zIndex: 2}}>{children}</View>
    </TouchableOpacity>
  );
}

const TabNavigator = () => {
  const {width} = useWindowDimensions();

  return (
    <Tab.Navigator
      initialRouteName={Routes.tabs.home}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: props => <CustomTabButton {...props} />,
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: '4%',
          right: '4%',
          width: '92%',
          elevation: 0,
          backgroundColor: Colors.pink_ff465f,
          paddingTop: 0,
          paddingBottom: 0,
          paddingHorizontal: 0,
          borderRadius: 15,
          height: 60,
        },
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

          return <CustomIcon name={IconComponent} size={size} />;
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
