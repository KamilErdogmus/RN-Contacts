import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../utils/SCREENS';
import BottomTabMain from '../screens/bottomTabs/BottomTabMain';
import ContactDetailScreen from '../screens/stacks/ContactDetailScreen';
import {COLORS} from '../theme/COLORS';
import CallingScreen from '../screens/stacks/CallingScreen';
import ContactFormScreen from '../screens/stacks/ContactFormScreen';
import {ThemeToggleButton} from '../components/router/ThemeToggleButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.BLACK,
        headerBackTitle: 'Back',
        headerRight: () => <ThemeToggleButton />,
      }}>
      <Stack.Screen name={SCREENS.BottomTabs} component={BottomTabMain} />
      <Stack.Screen name={SCREENS.Calling} component={CallingScreen} />
      <Stack.Screen
        options={{headerShown: true}}
        name={SCREENS.Detail}
        component={ContactDetailScreen}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerTitle:
            route.params.mode === 'add' ? 'Add New Contact' : 'Edit Contact',
        })}
        name={SCREENS.ContactForm}
        component={ContactFormScreen}
      />
    </Stack.Navigator>
  );
}
