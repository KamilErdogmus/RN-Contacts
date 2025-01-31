import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS} from '../../utils/SCREENS';
import RecentsScreen from './recents/RecentsScreen';
import ContactsScreen from './contacts/ContactsScreen';
import FavoritesScreen from './favorites/FavoritesScreen';
import TabBarIcon from '../../components/router/TabBarIcon';
import type {RouteProp} from '@react-navigation/native';
import {ThemeToggleButton} from '../../components/router/ThemeToggleButton';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const screenOptions = ({route}: {route: RouteProp<BottomTabParamList>}) => ({
  tabBarActiveTintColor: '#344cb7',
  tabBarInActiveTintColor: '#7e99a3',
  headerRight: () => <ThemeToggleButton />,
  tabBarIcon: ({focused, size}: {focused: boolean; size: number}) => (
    <TabBarIcon focused={focused} name={route.name} size={size} />
  ),
});

export default function BottomTabMain() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={SCREENS.Recent} component={RecentsScreen} />
      <Tab.Screen name={SCREENS.Contacts} component={ContactsScreen} />
      <Tab.Screen name={SCREENS.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
