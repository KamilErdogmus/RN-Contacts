import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {contactCardItemStyles} from './styles';
import {convertFullName} from '../../utils/convertFullName';
import Avatar from './Avatar';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/SCREENS';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useThemeColors} from '../../store/themeStore';

export default function ContactCardItem({item}: {item: IContact}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {colors} = useThemeColors();
  return (
    <Pressable
      onPress={() => navigation.navigate(SCREENS.Detail, {contact: item})}
      style={[
        contactCardItemStyles.container,
        {
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
        },
      ]}>
      <View style={contactCardItemStyles.avatarContainer}>
        <Avatar name={item.name} surname={item.surname} />
      </View>
      <View style={contactCardItemStyles.infoContainer}>
        <Text style={[contactCardItemStyles.name, {color: colors.text}]}>
          {convertFullName(item.name, item.surname)}
        </Text>
        <Text style={[contactCardItemStyles.job, {color: colors.secondary}]}>
          {item.job}
        </Text>
      </View>
    </Pressable>
  );
}
