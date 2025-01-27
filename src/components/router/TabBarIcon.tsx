import React from 'react';
import {SCREENS} from '../../utils/SCREENS';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  name: SCREENS;
  size: number;
  focused: boolean;
}

export default function TabBarIcon({name, size, focused}: IProps) {
  const getIconName = () => {
    switch (name) {
      case SCREENS.Resent:
        return 'history';
      case SCREENS.Contacts:
        return 'contacts';
      case SCREENS.Favorites:
        return 'favorite';
      default:
        return 'error';
    }
  };

  return (
    <Icon
      name={getIconName()}
      size={size}
      color={focused ? '#344cb7' : '#7e99a3'}
    />
  );
}
