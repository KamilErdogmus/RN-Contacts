import {Pressable, View} from 'react-native';
import React from 'react';
import {contactCardItemStyles} from './styles';
import Icon from 'react-native-vector-icons/Entypo';

interface FloatActionButtonProps {
  onPress: () => void;
}

const FloatActionButton = ({onPress}: FloatActionButtonProps) => {
  return (
    <View style={contactCardItemStyles.btnContainer}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          contactCardItemStyles.button,
          pressed && contactCardItemStyles.buttonPressed,
        ]}>
        <Icon name="plus" size={32} color="#431" />
      </Pressable>
    </View>
  );
};

export default FloatActionButton;
