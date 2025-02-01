import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS} from '../../utils/SCREENS';
import RecentsScreen from './recents/RecentsScreen';
import ContactsScreen from './contacts/ContactsScreen';
import FavoritesScreen from './favorites/FavoritesScreen';
import TabBarIcon from '../../components/router/TabBarIcon';
import type {RouteProp} from '@react-navigation/native';
import {ThemeToggleButton} from '../../components/router/ThemeToggleButton';
import {useThemeColors} from '../../store/themeStore';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabMain() {
  const theme = useThemeColors();

  const screenOptions = ({route}: {route: RouteProp<BottomTabParamList>}) => ({
    tabBarActiveTintColor: theme.colors.PRIMARY,
    tabBarInactiveTintColor: theme.colors.secondary,
    headerRight: () => <ThemeToggleButton />,
    tabBarIcon: ({focused, size}: {focused: boolean; size: number}) => (
      <TabBarIcon focused={focused} name={route.name} size={size} />
    ),

    tabBarStyle: {
      backgroundColor: theme.colors.card,
      borderTopColor: theme.colors.border,
      position: 'relative',
      zIndex: 1,
    },
    headerStyle: {
      backgroundColor: theme.colors.card,
      position: 'relative',
      zIndex: 1,
    },

    headerTintColor: theme.colors.text,

    headerShown: true,
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={SCREENS.Recent}
        component={RecentsScreen}
        options={{
          title: 'Recent',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={SCREENS.Contacts}
        component={ContactsScreen}
        options={{
          title: 'Contacts',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={SCREENS.Favorites}
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}
