import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useThemeStore} from '../../store/themeStore';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ThemeToggleButton = () => {
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const theme = useThemeStore(state => state.theme);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 8,
        marginRight: 10,
      }}>
      <Ionicons
        name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
        size={24}
        color={theme === 'dark' ? '#FFFFFF' : '#000000'} // Zıt renkler
      />
    </TouchableOpacity>
  );
};
