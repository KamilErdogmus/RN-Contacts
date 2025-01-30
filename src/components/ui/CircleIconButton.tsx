import {TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {UIStyles} from './styles';

export default function CircleIconButton({
  color,
  icon,
  onPress,
}: {
  color: string;
  icon: ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[UIStyles.circleContainer, {backgroundColor: color}]}>
      {icon}
    </TouchableOpacity>
  );
}
