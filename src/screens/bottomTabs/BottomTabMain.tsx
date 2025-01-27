import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS} from '../../utils/SCREENS';
import ResentsScreen from './resents/ResentsScreen';
import ContactsScreen from './contacts/ContactsScreen';
import FavoritesScreen from './favorites/FavoritesScreen';
import TabBarIcon from '../../components/router/TabBarIcon';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabMain() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIcon: ({focused, size}) => (
          <TabBarIcon focused={focused} name={route.name} size={size} />
        ),
      })}>
      <Tab.Screen name={SCREENS.Resent} component={ResentsScreen} />
      <Tab.Screen name={SCREENS.Contacts} component={ContactsScreen} />
      <Tab.Screen name={SCREENS.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
