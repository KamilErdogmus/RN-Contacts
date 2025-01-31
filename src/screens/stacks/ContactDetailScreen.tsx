import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {defaultScreenStyles} from '../../styles/defaultScreenStyles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {SCREENS} from '../../utils/SCREENS';
import Avatar from '../../components/contact/Avatar';
import {convertFullName} from '../../utils/convertFullName';
import {contactDetailScreenStyles} from './styles';
import {sizes} from '../../constants/constants';
import CircleIconButton from '../../components/ui/CircleIconButton';
import {COLORS} from '../../theme/COLORS';
import Icon from 'react-native-vector-icons/Entypo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {addRecentCall} from '../../database/Database';

export default function ContactDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, SCREENS.Detail>>();
  const {phone, address, name, surname, email, job, id} = route.params.contact;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const contactInfo = [
    {title: 'Name', value: name, id: 5},
    {title: 'Surname', value: surname, id: 6},
    {title: 'Phone', value: phone, id: 11},
    {title: 'Address', value: address, phone, id: 12},
    {title: 'Email', value: email, id: 13},
    {title: 'Job', value: job, id: 14},
  ];

  const handleCall = () => {
    addRecentCall(new Date().toDateString(), id);
    navigation.navigate(SCREENS.Calling, {
      contact: route.params.contact,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteContact(route.params.contact.id);
      navigation.goBack();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = () => {
    navigation.navigate(SCREENS.ContactForm, {
      mode: 'edit',
      contact: route.params.contact,
    });
  };

  return (
    <View style={defaultScreenStyles.container}>
      <ScrollView>
        <View style={contactDetailScreenStyles.userContainer}>
          <View style={contactDetailScreenStyles.upperHalf} />

          <View style={contactDetailScreenStyles.lowerHalf} />

          <View style={contactDetailScreenStyles.userInfoContainer}>
            <Avatar name={name} surname={surname} size={sizes.LARGE} />
            <Text style={contactDetailScreenStyles.fullName}>
              {convertFullName(name, surname)}
            </Text>
            <Text style={contactDetailScreenStyles.job}>{job}</Text>
          </View>
        </View>
        <View style={contactDetailScreenStyles.buttonContainer}>
          <CircleIconButton
            color={COLORS.GRAY}
            icon={<Icon size={32} name="star" color={COLORS.WHITE} />}
          />
          <CircleIconButton
            color={COLORS.ERROR}
            icon={<Icon size={32} name="message" color={COLORS.WHITE} />}
          />

          <CircleIconButton
            onPress={handleCall}
            color={COLORS.SUCCESS}
            icon={<Icon size={32} name="phone" color={COLORS.WHITE} />}
          />
        </View>
        {contactInfo.map(item => (
          <View style={contactDetailScreenStyles.infoContainer} key={item.id}>
            <Text style={contactDetailScreenStyles.title}>{item.title}</Text>
            <Text style={contactDetailScreenStyles.phone}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
