import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../utils/SCREENS';
import BottomTabMain from '../screens/bottomTabs/BottomTabMain';
import ContactDetailScreen from '../screens/stacks/ContactDetailScreen';
import CallingScreen from '../screens/stacks/CallingScreen';
import ContactFormScreen from '../screens/stacks/ContactFormScreen';
import {ThemeToggleButton} from '../components/router/ThemeToggleButton';
import {useThemeColors} from '../store/themeStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  const theme = useThemeColors();

  const screenOptions = {
    headerShown: false,
    headerTintColor: theme.colors.text,
    headerBackTitle: 'Back',
    headerRight: () => <ThemeToggleButton />,
    headerStyle: {
      backgroundColor: theme.colors.card,
    },
    contentStyle: {
      backgroundColor: theme.colors.background,
    },
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.BottomTabs} component={BottomTabMain} />
      <Stack.Screen name={SCREENS.Calling} component={CallingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
        }}
        name={SCREENS.Detail}
        component={ContactDetailScreen}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerTitle:
            route.params.mode === 'add' ? 'Add New Contact' : 'Edit Contact',
          headerStyle: {
            backgroundColor: theme.colors.card,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.colors.text,
        })}
        name={SCREENS.ContactForm}
        component={ContactFormScreen}
      />
    </Stack.Navigator>
  );
}
