import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import Router from './src/Router/Router';
import {useThemeColors} from './src/store/themeStore';
import Toast from 'react-native-toast-message';

const App = () => {
  const theme = useThemeColors();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
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
