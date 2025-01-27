import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../utils/SCREENS';
import BottomTabMain from '../screens/bottomTabs/BottomTabMain';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.BottomTabs} component={BottomTabMain} />
    </Stack.Navigator>
  );
}
