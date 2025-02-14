import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {
  addRecentCall,
  addToFavorites,
  deleteContact,
  getFavorites,
  removeFromFavorites,
} from '../../database/Database';
import {useThemeColors} from '../../store/themeStore';
import Toast from 'react-native-toast-message';
import {useContactStore} from '../../store/store';

export default function ContactDetailScreen() {
  const theme = useThemeColors();
  const route = useRoute<RouteProp<RootStackParamList, SCREENS.Detail>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = new Animated.Value(0);
  const {fetchFavorites, contacts, setCurrentDetailName} = useContactStore();

  const currentContact =
    contacts.find(c => c.id === route.params.contact.id) ||
    route.params.contact;
  const fullName = convertFullName(currentContact.name, currentContact.surname);

  useEffect(() => {
    navigation.setParams({
      headerTitle: fullName,
    });
  }, [navigation, fullName, currentContact]);

  const contactInfo = [
    {title: 'Name', value: currentContact.name, id: 5},
    {title: 'Surname', value: currentContact.surname, id: 6},
    {title: 'Phone', value: currentContact.phone, id: 11},
    {title: 'Address', value: currentContact.address, id: 12},
    {title: 'Email', value: currentContact.email, id: 13},
    {title: 'Job', value: currentContact.job, id: 14},
  ];

  useEffect(() => {
    const updateTitle = async () => {
      await Promise.resolve();
      setCurrentDetailName(fullName);
    };
    updateTitle();
  }, [
    currentContact.name,
    currentContact.surname,
    setCurrentDetailName,
    fullName,
  ]);

  const handleCall = () => {
    addRecentCall(currentContact.id as number);
    navigation.navigate(SCREENS.Calling, {
      contact: currentContact,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteContact(currentContact.id as number);
      Toast.show({
        type: 'success',
        text1: 'Contact Deleted',
        text2: 'Contact has been successfully deleted',
        position: 'bottom',
        visibilityTime: 2000,
      });
      useContactStore.getState().triggerRefresh();
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Delete Failed',
        text2: 'Could not delete contact. Please try again.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  const handleEdit = () => {
    navigation.navigate(SCREENS.ContactForm, {
      mode: 'edit',
      contact: currentContact,
    });
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(currentContact.id as number);
        setIsFavorite(false);
        Toast.show({
          type: 'success',
          text1: 'Removed from Favorites',
          position: 'bottom',
          visibilityTime: 2000,
        });
      } else {
        await addToFavorites(currentContact.id as number);
        setIsFavorite(true);
        Toast.show({
          type: 'success',
          text1: 'Added to Favorites',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
      await fetchFavorites();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Operation Failed',
        text2: 'Please try again',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favorites = await getFavorites();
        setIsFavorite(favorites.some(fav => fav.id === currentContact.id));
      } catch {}
    };

    checkFavoriteStatus();
  }, [currentContact.id]);

  return (
    <View
      style={[
        defaultScreenStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={contactDetailScreenStyles.contentContainer}>
        <View style={[contactDetailScreenStyles.userContainer]}>
          <View style={contactDetailScreenStyles.userInfoContainer}>
            <Avatar
              name={currentContact.name}
              surname={currentContact.surname}
              size={sizes.LARGE}
            />
            <Text
              style={[
                contactDetailScreenStyles.fullName,
                {color: theme.colors.text},
              ]}>
              {fullName}
            </Text>
            <Text
              style={[
                contactDetailScreenStyles.job,
                {color: theme.colors.secondary},
              ]}>
              {currentContact.job}
            </Text>
          </View>
        </View>
        <View style={contactDetailScreenStyles.buttonContainer}>
          <CircleIconButton
            onPress={handleToggleFavorite}
            color="#344cb7"
            icon={
              <Icon
                size={32}
                name={isFavorite ? 'star' : 'star-outlined'}
                color="#FFD700"
              />
            }
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
      </Animated.ScrollView>
    </View>
  );
}
