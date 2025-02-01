// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import Router from './src/Router/Router';
import {useThemeColors} from './src/store/themeStore';

const App = () => {
  const theme = useThemeColors();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
