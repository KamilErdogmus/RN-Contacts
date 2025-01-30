import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../utils/SCREENS';
import BottomTabMain from '../screens/bottomTabs/BottomTabMain';
import ContactDetailScreen from '../screens/stacks/ContactDetailScreen';
import {COLORS} from '../theme/COLORS';
import CallingScreen from '../screens/stacks/CallingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.BLACK,
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name={SCREENS.BottomTabs} component={BottomTabMain} />
      <Stack.Screen name={SCREENS.Calling} component={CallingScreen} />
      <Stack.Screen
        options={{headerShown: true}}
        name={SCREENS.Detail}
        component={ContactDetailScreen}
      />
    </Stack.Navigator>
  );
}
