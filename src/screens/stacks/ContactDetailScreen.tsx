import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
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
import {addRecentCall, updateContact} from '../../database/Database';
import {useThemeColors} from '../../store/themeStore';

export default function ContactDetailScreen() {
  const theme = useThemeColors();
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

  const handleEdit = async () => {
    try {
      await updateContact(route.params.contact.id as number, {
        name,
        surname,
        phone,
        email,
        address,
        job,
      });

      navigation.goBack();
    } catch (error) {
      console.error('Edit error:', error);
    }
  };

  return (
    <View
      style={[
        defaultScreenStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <ScrollView
        contentContainerStyle={contactDetailScreenStyles.contentContainer}>
        <View style={[contactDetailScreenStyles.userContainer]}>
          <View style={contactDetailScreenStyles.userInfoContainer}>
            <Avatar name={name} surname={surname} size={sizes.LARGE} />
            <Text
              style={[
                contactDetailScreenStyles.fullName,
                {color: theme.colors.text},
              ]}>
              {convertFullName(name, surname)}
            </Text>
            <Text
              style={[
                contactDetailScreenStyles.job,
                {color: theme.colors.secondary},
              ]}>
              {job}
            </Text>
          </View>
        </View>
        <View style={contactDetailScreenStyles.buttonContainer}>
          <CircleIconButton
            color="#344cb7"
            icon={<Icon size={32} name="star" color="#FFFFFF" />}
          />
          <CircleIconButton
            color="#F44336"
            icon={<Icon size={32} name="message" color="#FFFFFF" />}
          />
          <CircleIconButton
            onPress={handleCall}
            color="#4CAF50"
            icon={<Icon size={32} name="phone" color="#FFFFFF" />}
          />
        </View>
        {contactInfo.map(item => (
          <View
            style={[
              contactDetailScreenStyles.infoContainer,
              {backgroundColor: theme.colors.card},
            ]}
            key={item.id}>
            <Text
              style={[
                contactDetailScreenStyles.title,
                {color: theme.colors.text},
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                contactDetailScreenStyles.phone,
                {color: theme.colors.text},
              ]}>
              {item.value}
            </Text>
          </View>
        ))}

        <View style={contactDetailScreenStyles.actionButtonsContainer}>
          <TouchableOpacity
            style={[
              contactDetailScreenStyles.actionButton,
              {backgroundColor: COLORS.ERROR},
            ]}
            onPress={handleDelete}>
            <Text style={contactDetailScreenStyles.actionButtonText}>
              Delete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              contactDetailScreenStyles.actionButton,
              {backgroundColor: COLORS.PRIMARY},
            ]}
            onPress={handleEdit}>
            <Text style={contactDetailScreenStyles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
