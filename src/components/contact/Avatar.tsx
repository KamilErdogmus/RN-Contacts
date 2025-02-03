import {View, Text} from 'react-native';
import React from 'react';
import {contactCardItemStyles} from './styles';
import {getInitialLetters} from '../../utils/convertFullName';
import {sizes, width} from '../../constants/constants';
import {useThemeColors} from '../../store/themeStore';
import {COLORS} from '../../theme/COLORS';

export default function Avatar({
  name,
  surname,
  size = sizes.MEDIUM,
}: {
  name: string;
  size?: string;
  surname: string;
}) {
  const getSize = (): number => {
    switch (size) {
      case sizes.SMALL:
        return width * 0.12;
      case sizes.MEDIUM:
        return width * 0.15;
      case sizes.LARGE:
        return width * 0.18;
      default:
        return width * 0.16;
    }
  };
  const {colors} = useThemeColors();
  const containerSize = getSize();
  return (
    <View
      style={[
        contactCardItemStyles.avatarContainer,
        {
          height: containerSize,
          width: containerSize,
          backgroundColor: COLORS.AVATAR,
        },
      ]}>
      <Text style={[contactCardItemStyles.avatarText, {color: colors.white}]}>
        {getInitialLetters(name, surname)}
      </Text>
    </View>
  );
}
