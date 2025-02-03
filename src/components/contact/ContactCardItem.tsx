import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {contactCardItemStyles} from './styles';
import {convertFullName} from '../../utils/convertFullName';
import Avatar from './Avatar';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/SCREENS';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useThemeColors} from '../../store/themeStore';
import {useContactStore} from '../../store/store';

export default function ContactCardItem({item}: {item: IContact}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {colors} = useThemeColors();
  const {setCurrentDetailName} = useContactStore();
  const fullName = convertFullName(item.name, item.surname);

  const handlePress = () => {
    setCurrentDetailName(fullName);
    navigation.navigate(SCREENS.Detail, {contact: item});
  };

  return (
    <Pressable
      onPress={handlePress}
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
          {fullName}
        </Text>
        <Text style={[contactCardItemStyles.job, {color: colors.secondary}]}>
          {item.job}
        </Text>
      </View>
    </Pressable>
  );
}
