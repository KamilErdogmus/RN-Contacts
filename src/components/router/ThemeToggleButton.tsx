import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useThemeStore} from '../../store/themeStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
// veya tercih ettiğiniz başka bir icon set:
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';

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
        color={theme === 'dark' ? '#000' : '#000'}
      />
    </TouchableOpacity>
  );
};
