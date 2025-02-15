import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet, LogBox} from 'react-native';
import Router from './src/Router/Router';
import {useThemeColors} from './src/store/themeStore';
import Toast from 'react-native-toast-message';
import {
  createContactsTable,
  createFavoritesTable,
  createRecentsTable,
} from './src/database/Database';

LogBox.ignoreLogs(['Open debugger to view warning']);

const App = () => {
  const {colors} = useThemeColors();

  useEffect(() => {
    const initializeData = async () => {
      try {
        await createContactsTable();
        await createRecentsTable();
        await createFavoritesTable();
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
