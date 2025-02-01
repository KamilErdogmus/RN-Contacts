import {TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {UIStyles} from './styles';
import {useThemeColors} from '../../store/themeStore';

export default function CircleIconButton({
  color,
  icon,
  onPress,
}: {
  color: string;
  icon: ReactNode;
  onPress?: () => void;
}) {
  const theme = useThemeColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        UIStyles.circleContainer,
        {
          backgroundColor: color,
          shadowColor: theme.colors.shadow,
        },
      ]}>
      {icon}
    </TouchableOpacity>
  );
}
