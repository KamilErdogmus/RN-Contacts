import {Pressable, View} from 'react-native';
import React from 'react';
import {contactCardItemStyles} from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import {useThemeColors} from '../../store/themeStore';

interface FloatActionButtonProps {
  onPress: () => void;
}

const FloatActionButton = ({onPress}: FloatActionButtonProps) => {
  const {colors} = useThemeColors();

  return (
    <View
      style={[
        contactCardItemStyles.btnContainer,
        {shadowColor: colors.shadow},
      ]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          contactCardItemStyles.button,
          {backgroundColor: colors.PRIMARY},
          pressed && contactCardItemStyles.buttonPressed,
        ]}>
        <Icon name="plus" size={32} color={colors.white} />
      </Pressable>
    </View>
  );
};

export default FloatActionButton;
