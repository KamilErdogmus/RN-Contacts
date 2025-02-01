// components/router/TabBarIcon.tsx
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeColors} from '../../store/themeStore';
import {SCREENS} from '../../utils/SCREENS';

const TabBarIcon = ({focused, name, size}) => {
  const {colors} = useThemeColors();

  const getIconName = () => {
    switch (name) {
      case SCREENS.Recent:
        return focused ? 'time' : 'time-outline';
      case SCREENS.Contacts:
        return focused ? 'people' : 'people-outline';
      case SCREENS.Favorites:
        return focused ? 'star' : 'star-outline';
      default:
        return 'help-outline';
    }
  };

  return (
    <Icon
      name={getIconName()}
      size={size}
      color={focused ? colors.PRIMARY : colors.secondary}
    />
  );
};

export default TabBarIcon;
