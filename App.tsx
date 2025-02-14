import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import Router from './src/Router/Router';
import {useThemeColors} from './src/store/themeStore';
import Toast from 'react-native-toast-message';
import {
  createContactsTable,
  createFavoritesTable,
  createRecentsTable,
  insertSampleData,
} from './src/database/Database';

const App = () => {
  const {colors} = useThemeColors();

  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log('Creating tables...');
        await createContactsTable();
        await createRecentsTable();
        await createFavoritesTable();

        console.log('Inserting sample data...');
        const result = await insertSampleData();

        if (result) {
          console.log('Sample data inserted successfully');
        } else {
          console.error('Failed to insert sample data');
        }
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
